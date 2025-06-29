import {Cart} from '../model/Cart.js';


//add to cart
export const addToCart = async(req,res)=>{
    const {productId , title, price,qty} = req.body;

    const userId = req.user;
    let cart = await Cart.findOne({userId});

    if(!cart){
        cart = new Cart({userId,items:[]});
    }

    const itemIndex = cart.items.findIndex(
        (item)=>{
            item.productId,toString() == productId
        }
    )
    if(itemIndex > -1){
        cart.items[itemIndex].qty += 1;
        cart.items[itemIndex].price += price * qty;
    }else{
        cart.items.push({productId , title, price,qty});
    }
    await cart.save();

    res.json({message:'item added to cat . . . !',success:true});
}

//get user cart
export const userCart = async(req,res)=>{
    const userId = req.user;

    let cart = await Cart.findOne(id);

    if(!cart) return res.json({message:'cart not found . . . !',success:false});

    res.json({message:'cart  found . . . !',success:true,cart});
} 

//remove product from cart
export const removeProductFromCart = async(req,res)=>{
    const productId = req.params.productId;
    const userId = req.user;

    let cart = await Cart.findOne({userId});

    if(!cart) return res.json({message:'cart not found . . . !',success:false});

    cart.items = cart.items.filter((item)=>item.productId.toString()!==productId);

    await Cart.save();

    res.json({message:' product has been removed from cart  . . .!',success:true});
}

//clear cart
export const clearCart = async(req,res)=>{
    const userId = req.user;

    let csrt = await Cart.findOne({userId});

    if(!cart){
        cart = new Cart({items:[]});
    }
    else{
        cart.items = [];
    }
    await cart.save();

    res.json({message:' user cart cleared . . .!',success:true});

}

//decrease product quantity
export const decreaseProductQusntity = async(req,res)=>{
    const {productId , qty} = req.body;
    const userId = req.user;
    let cart = await Cart.findOne({userId});

    if(!cart){
        cart = new Cart({userId,items:[]});
    }
    const itemIndex = cart.items.findIndex(
        (item)=>{
            item.productId,toString() == productId
        }
    )
    if(itemIndex > -1){
        const item = cart.items[itemIndex]
        if(item.qty > qty){
            const pricePerUnit = items.price/items.qty;
            
            item.qty -=qty;
            item.price -= pricePerUnit * qty;
        }
        else{
            cart.items.splice(itemIndex,1);
        }
    }else{
        return res.json({message:'Invalid product id . . . !',success:false});
    }
    await cart.save();

    res.json({message:'item quantity decreased . . . !',success:true});
}
