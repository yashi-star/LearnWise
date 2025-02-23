import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from 'cloudinary';
import LayoutModel from "../models/layout.model";

//create layout
export const createLayout = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { type } = req.body;
            const isTypeExist = await LayoutModel.findOne({ type });

            if (isTypeExist && type !== "FAQ" && type !== "Categories") {
                return next(new ErrorHandler(`${type} already exists`, 400));
            }

            if (type === "Banner") {
                const { image, title, subTitle } = req.body;
                if (!image) return next(new ErrorHandler("Image is required", 400));

                const myCloud = await cloudinary.v2.uploader.upload(image, {
                    folder: 'layout',
                });

                const banner = {
                    type: "Banner",
                    banner: {
                        image: {
                            public_id: myCloud.public_id,
                            url: myCloud.secure_url,
                        },
                        title,
                        subTitle
                    },
                };

                await LayoutModel.create(banner);
            }

            if (type === "FAQ") {
                const { faq } = req.body;
                if (!Array.isArray(faq)) return next(new ErrorHandler("FAQ must be an array", 400));

                const faqItems = faq.map((item: any) => ({
                    question: item.question,
                    answer: item.answer,
                }));

                await LayoutModel.findOneAndUpdate(
                    { type: "FAQ" },
                    { type: "FAQ", faq: faqItems },
                    { new: true, upsert: true } // Ensure update works or create if not exists
                );
            }

            if (type === "Categories") {
                const { categories } = req.body;
                if (!Array.isArray(categories)) return next(new ErrorHandler("Categories must be an array", 400));

                const categoriesItems = categories.map((item: any) => ({
                    title: item.title,
                }));

                await LayoutModel.findOneAndUpdate(
                    { type: "Categories" },
                    { type: "Categories", categories: categoriesItems },
                    { new: true, upsert: true } // Ensure update works or create if not exists
                );
            }

            res.status(200).json({
                success: true,
                message: "Layout created/updated successfully"
            });

        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);



//edit layout
export const editLayout = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body;

        if (type === "Banner") {
            const bannerData: any = await LayoutModel.findOne({ type: "Banner" });
            const { image, title, subTitle } = req.body;
            const data = image.startsWith("https") ?
                bannerData
                : await cloudinary.v2.uploader.upload(image, {
                    folder: "layout",
                });

            const banner = {
                type: "Banner",
                image: {
                    public_id: image.startsWith("https")
                        ? bannerData
                        : data?.public_id,
                    url: image.startsWith("https")
                        ? bannerData.banner.image.url
                        : data?.secure_url,

                },
                title,
                subTitle,
            };

            await LayoutModel.findByIdAndUpdate(bannerData._id, { banner });
        }

        if (type === "FAQ") {
            const { faq } = req.body;
            const FaqItem = await LayoutModel.findOne({ type: "FAQ" });
            const faqItems = faq.map((item: any) => ({
                question: item.question,
                answer: item.answer,
            }));

            await LayoutModel.findByIdAndUpdate(FaqItem?._id, { type: "FAQ", faq: faqItems });
        }

        if (type === "Categories") {
            const { categories } = req.body;
            const categoriesData = await LayoutModel.findOne({ type: "Categories" });

            const categoriesItems = categories.map((item: any) => ({
                title: item.title,
            }));

            await LayoutModel.findByIdAndUpdate(categoriesData?._id, {
                type: "Categories",
                categories: categoriesItems,
            });
        }

        res.status(200).json({
            success: true,
            message: "Layout uploaded successfully",
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});



//get layout by type
export const getLayoutByType = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.params;
        const layout = await LayoutModel.findOne({ type });

        res.status(201).json({
            success: true,
            layout,
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});
