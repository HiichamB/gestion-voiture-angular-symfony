from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import uuid4

app = FastAPI()

# inned to set db 
voitures_db = []

class Caracteristique(BaseModel):
    nom: str
    valeur: str

class Voiture(BaseModel):
    model: str
    km_h: float
    caracteristiques: Optional[List[Caracteristique]] = []

class VoitureInDB(Voiture):
    id: str

def calculate_time(distance: float, km_h: float) -> float:
    if km_h == 0:
        raise HTTPException(status_code=400, detail="Speed cannot be zero")
    return distance / km_h

@app.post("/voitures", response_model=VoitureInDB)
def add_voiture(voiture: Voiture):
    voiture_id = str(uuid4())  # Generate a unique ID
    voiture_in_db = VoitureInDB(id=voiture_id, **voiture.dict())
    voitures_db.append(voiture_in_db)
    return voiture_in_db

@app.get("/voitures", response_model=List[VoitureInDB])
def get_voitures():
    return voitures_db

@app.get("/voitures/{id}", response_model=VoitureInDB)
def get_voiture_by_id(id: str):
    voiture = next((v for v in voitures_db if v.id == id), None)
    if not voiture:
        raise HTTPException(status_code=404, detail="Voiture not found")
    return voiture

@app.post("/calculate-time")
def calculate_time_endpoint(distance: float, model: str):
    voiture = next((v for v in voitures_db if v.model == model), None)
    if not voiture:
        raise HTTPException(status_code=404, detail="Voiture not found")
    
    time = calculate_time(distance, voiture.km_h)
    return {"time_to_travel": time}
