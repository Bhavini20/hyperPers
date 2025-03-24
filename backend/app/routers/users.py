from fastapi import APIRouter, HTTPException, status, Depends
from app.models.schemas import UserProfile
from app.utils.database import users
from typing import List
import datetime

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=UserProfile, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserProfile):
    # Check if user with this email already exists
    if users.find_one({"email": user.email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    # Convert to dict and save to database
    user_dict = user.dict()
    result = users.insert_one(user_dict)
    
    # Return the created user
    return user_dict

@router.get("/{user_id}", response_model=UserProfile)
async def get_user(user_id: str):
    user = users.find_one({"user_id": user_id})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user

# Add this new endpoint
@router.get("/email/{email}", response_model=UserProfile)
async def get_user_by_email(email: str):
    user = users.find_one({"email": email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user

@router.get("/", response_model=List[UserProfile])
async def get_all_users():
    all_users = list(users.find())
    return all_users