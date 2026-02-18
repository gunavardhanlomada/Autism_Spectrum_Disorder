from pydantic import BaseModel, EmailStr

class UserAuth(BaseModel):
    email: str
    password: str
