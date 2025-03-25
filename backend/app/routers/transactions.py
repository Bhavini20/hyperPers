from fastapi import APIRouter, HTTPException
from app.db.transaction_operations import TransactionOperations
from app.db.user_operations import UserOperations
from datetime import datetime

router = APIRouter(prefix="/transactions", tags=["transactions"])

@router.get("/{user_id}")
async def get_transactions(user_id: str, limit: int = 50, skip: int = 0):
    """Get recent transactions for a user"""
    # Check if user exists
    user = UserOperations.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get transactions
    transactions = TransactionOperations.get_user_transactions(
        user_id, limit=limit, skip=skip
    )
    return transactions

@router.get("/{user_id}/analytics")
async def get_transaction_analytics(user_id: str, months: int = 6):
    """Get transaction analytics for a user"""
    # Check if user exists
    user = UserOperations.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get current month and year
    now = datetime.now()
    current_month = now.month
    current_year = now.year
    
    # Get monthly summaries for the past X months
    monthly_data = []
    for i in range(months - 1, -1, -1):
        # Calculate month and year
        month = (current_month - i) % 12
        if month == 0:
            month = 12
        year = current_year - ((current_month - i) // 12)
        
        # Get monthly summary
        summary = TransactionOperations.get_monthly_summary(user_id, year, month)
        month_name = datetime(year, month, 1).strftime("%b")
        
        monthly_data.append({
            "month": month_name,
            "income": summary["income"],
            "expenses": summary["expenses"]
        })
    
    # Get category spending trends
    categories = ["Groceries", "Dining", "Entertainment", "Utilities"]
    category_trends = {}
    
    for category in categories:
        trend = TransactionOperations.get_category_spending_trend(
            user_id, category, months
        )
        category_trends[category] = trend
    
    return {
        "monthly_data": monthly_data,
        "category_trends": category_trends
    }

@router.get("/{user_id}/sentiment")
async def get_sentiment(user_id: str):
    """Get sentiment analysis for a user"""
    # Check if user exists
    user = UserOperations.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Return sentiment from user profile
    sentiment = user.get("sentiment", {
        "overall_sentiment": "neutral",
        "confidence": 0.5,
        "financial_health": "stable"
    })
    
    return {
        "user_id": user_id,
        "sentiment_analysis": sentiment
    }