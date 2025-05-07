const prisma = require("../config/prisma");
const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


exports.create = async (req, res) => {
    //code
    try {
        //code
        const { title, description, price, quantity, categoryId, images } = req.body;
        // console.log(title, description, price, quantity, images);
        const product = await prisma.product.create({
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        })
        res.send(product);
    } catch (err) {
        //error
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.list = async (req, res) => {
    //code
    try {
        //code
        const { count } = req.params;
        const products = await prisma.product.findMany({
            take: parseInt(count),
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products);
    } catch (err) {
        //error
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.read = async (req, res) => {
    //code
    try {
        //code
        const { id } = req.params;
        const product = await prisma.product.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(product);
    } catch (err) {
        //error
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.update = async (req, res) => {
    //code
    try {
        //code
        const { id } = req.params;
        const { title, description, price, quantity, categoryId, images } = req.body;
        // console.log(title, description, price, quantity, images);

        //clear image
        await prisma.image.deleteMany({
            where: {
                productId: Number(id)
            }
        })

        const product = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        })
        res.send(product);
    } catch (err) {
        //error
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.remove = async (req, res) => {
    //code
    try {
        //code
        const { id } = req.params;

        //step 1: ค้นหาสินค้า Include รูปภาพ
        const product = await prisma.product.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                images: true
            }
        })

        if(!product){
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        console.log('product--->', product);


        //step 2: Promis ลบรูปภาพใน Cloudinary
        const deletedImages = product.images.map((image) => 
            new Promise((resolve, reject) => {
                cloudinary.uploader.destroy(image.public_id, (error, result) => {
                    if(error) reject(error)
                    else resolve(result)
                })
            })
        )

        await Promise.all(deletedImages)

        //step 3: ลบสินค้าใน
        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })
        res.send('Delete product successfully!')
    } catch (err) {
        //error
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.listby = async (req, res) => {
    //code
    try {
        //code
        const { sort, order, limit } = req.body;
        const products = await prisma.product.findMany({
            take: limit,
            orderBy: {
                [sort]: order
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products);
    } catch (err) {
        //error
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}



const handleQuery = async (req, res, query) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                title: {
                    contains: query
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error: Search query'
        });
    }
}

const handlePrice = async (req, res, priceRange) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                price: {
                    gte: priceRange[0],
                    lte: priceRange[1]
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error: Search price!!!'
        });
    }
}

const handleCategory = async (req, res, categoryId) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId: {
                    in: categoryId.map((id) => Number(id))
                }

            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error: Search Category!!!'
        });
    }
}


exports.searchFilters = async (req, res) => {
    //code
    try {
        //code
        const { query, category, price } = req.body;

        if (query) {
            console.log('query-->', query)
            await handleQuery(req, res, query)
        }
        if (category) {
            console.log('category-->', category)
            await handleCategory(req, res, category)
        }
        if (price) {
            console.log('price-->', price)
            await handlePrice(req, res, price)
        }

        // res.json({
        //     message: 'Read product search successfully!'
        // })
    } catch (err) {
        //error
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}







exports.createImages = async (req, res) => {
    //code
    try {
        // console.log(req.body);
        const result = await cloudinary.uploader.upload(req.body.image, {
            public_id: `Jiryau-${Date.now()}`,
            resource_type: 'auto',
            folder: 'React-Ecom2024-byRoitai'
        })
        res.send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.removeImage = async (req, res) => {
    //code
    try {
        const { public_id } = req.body;
        // console.log(public_id);

        cloudinary.uploader.destroy(public_id, (result) => {
            res.send('Delete image successfully!');
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}