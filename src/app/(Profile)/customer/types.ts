export type productDetailFeedback ={
    name : string,
    description : string
    pictures: string[]
}
export type orderFeedback = {
    id: string;
    productName: string;
    productImage: string;
    content: string;
    rating: number;
    username: string;
    createdAt: string;
    productId: string;
}