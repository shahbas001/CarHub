export class Pitem {
    constructor(
        public productId: number,
        public productName: string,
        public description: string,
        public expiryDate: Date,
        public price: number,
        public imageUrl: string,
    ) { }
}