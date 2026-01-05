from pydantic import BaseModel

class ReviewCreate(BaseModel):
    name: str
    rating: int
    comment: str

class ReviewResponse(ReviewCreate):
    id: int

    class Config:
        orm_mode = True
