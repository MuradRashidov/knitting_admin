import Customer from "@/lib/models/customer";
import Order from "@/lib/models/order";
import Product from "@/lib/models/product";
import { connectDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest,{params}:{params:{orderId:string}}) => {
            try {
                await connectDB();
                const orderDetails = await Order
                .findById(params.orderId)
                .populate({path:"products.product",model:Product});
                if (!orderDetails) {
                    return new NextResponse(JSON.stringify({message:"Order not found"}),{status:404})
                }
                const customer = await Customer.findOne({clerkId:orderDetails.customerClerkId});
                return NextResponse.json({orderDetails,customer},{status:200});
            } catch (error) {
                console.log('[orderId_GET]',error);
                return new NextResponse("Internal server error",{status:500})
                
            }
}