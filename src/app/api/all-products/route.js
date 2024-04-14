import { NextResponse } from "next/server";
import Product from "../../models/base.db.js";
import dbConnect from "../../models/connect.db.js";

export async function POST(req) {

  await dbConnect();

  const { page, limit = 10 } = req.body;
  const skip = (page - 1) * limit;

  try {
  const res =await Product.find()
    .skip(skip) 
    .limit(limit) 
    .exec();
        return NextResponse.json({ products:res });
    
        
  } catch (error) {
    console.log("error",error);
  }


}