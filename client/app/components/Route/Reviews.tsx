import { styles } from '@/app/styles/style'
import React from 'react'
import Image from 'next/image'
import ReviewCard from '../Review/ReviewCard'

export const reviews=[
    {
        name:"John Doe",
        avatar:"https://res.cloudinary.com/dhcc2rwis/image/upload/v1735572419/samples/people/smiling-man.jpg",
        profession:"Web Developer",
        comment:" consectetur adipisicing elit. Quisquam, necessitatibus illum! Incidunt fuga odit dignissimos nisi expedita adipisci autem facilis libero temporibus, eaque at, deleniti aliquid animi doloremque perferendis. Repudiandae.",
    },
    {
        name:"Jian",
        avatar: "https://res.cloudinary.com/dhcc2rwis/image/upload/v1735572428/cld-sample.jpg",
        profession:"Sotware Developer",
        comment:"  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, necessitatibus illum! Incidunt fuga odit dignissimos nisi expedita adipisci autem facilis libero temporibus, eaque at, deleniti aliquid animi doloremque perferendis. Repudiandae.",
    },
    {
        name:"Marchell Doe",
        avatar: "https://res.cloudinary.com/dhcc2rwis/image/upload/v1735572428/samples/woman-on-a-football-field.jpg",
        profession:"Professor",
        comment:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,ndae.",
    },
    {
        name:"Micheal",
        avatar: "https://res.cloudinary.com/dhcc2rwis/image/upload/v1735572428/samples/upscale-face-1.jpg",
        profession:"Junior Developer",
        comment:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, necessitatibus illum! Incidunt fuga odit dignissimos nisi expedita adipisci autem facilis libero temporibus, eaque at, deleniti aliquid animi doloremque perferendis. Repudiandae.",
    },
    
]
const Reviews = () => {
  return (
    <div className='w-[90%] 800px:w-[85%] m-auto '>
        <div className='w-full 800px:flex  item-center'>
            <div className='800px:w-[50%] w-full'>
                <Image
                src="/images/business.png"
                alt="business"
                width={700}
                height={700}
                />
            </div>
            <div className='800px:w-[50%] w-full'>
                <h3 className={`${styles.title} 800px:!text-[40px]`}>
                    Our students are <span className='text-gradient'>Our Strength</span>{" "}
                    <br/>
                    See What They Say About Us
                </h3>
                <br/>
                <p className={styles.label}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, necessitatibus illum! Incidunt fuga odit dignissimos nisi expedita adipisci autem facilis libero temporibus, eaque at, deleniti aliquid animi doloremque perferendis. Repudiandae.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, necessitatibus illum! Incidunt fuga odit dignissimos nisi expedita adipisci autem facilis libero temporibus, eaque at, deleniti aliquid animi doloremque perferendis. Repudiandae.
                </p>
        </div>
        <br/>
    </div>
    <br/>
    <div className='grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0'>
    {
        reviews && reviews.map((i, index) =>
            <ReviewCard item={i} key={`${i.name}-${index}`} />
        )
    }
</div>

    </div>
  );
};

export default Reviews;