import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { sanityClient } from "../lib/sanity";
import { urlFor } from "../lib/image";
import { PortableText } from "@portabletext/react";


type Post = {
  title: string;
  publishedAt: string;
  mainImage?: any;
  body?: any;

  author?: {
    name: string;
    image?: any;
  };

  categories?: {
    title: string;
  }[];
};



const portableComponents = {

  block: {

    h1: ({ children }: any) => (
      <h1 className="mb-6 text-4xl font-black text-[#064F26]">
        {children}
      </h1>
    ),


    h2: ({ children }: any) => (
      <h2 className="mb-5 mt-10 text-3xl font-bold text-[#064F26]">
        {children}
      </h2>
    ),


    h3: ({ children }: any) => (
      <h3 className="mb-4 mt-8 text-2xl font-bold text-[#064F26]">
        {children}
      </h3>
    ),


    normal: ({ children }: any) => (
      <p className="mb-5 leading-8 text-[#404840]">
        {children}
      </p>
    ),

  },


  marks: {

    link: ({ children, value }: any) => (

      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-[#0B7A3B] hover:text-[#F4A900]"
      >
        {children}
      </a>

    ),

  },

};



export default function NewsPost() {

  const { slug } = useParams();


  const [post, setPost] = useState<Post | null>(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {


    async function fetchPost() {

      try {


        const data = await sanityClient.fetch(

          `
          *[_type == "post" && slug.current == $slug][0]{
            title,
            publishedAt,
            mainImage,
            body,
            author->{
              name,
              image
            },
            categories[]->{
              title
            }
          }
          `,

          {
            slug,
          }

        );


        setPost(data);



      } catch (error) {

        console.error(
          "Failed to load article:",
          error
        );

      } finally {

        setLoading(false);

      }

    }



    fetchPost();


  }, [slug]);




  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        <h2 className="text-xl font-bold text-[#064F26]">
          Loading article...
        </h2>

      </div>

    );

  }




  if (!post) {

    return (

      <div className="flex min-h-screen flex-col items-center justify-center">


        <h2 className="text-2xl font-black text-[#064F26]">
          Article not found
        </h2>



        <Link

          to="/news"

          className="mt-5 rounded-full bg-[#F4A900] px-6 py-3 font-bold"

        >
          Back to News
        </Link>


      </div>

    );

  }





  return (

    <div className="min-h-screen bg-white text-[#1B1B1B]">


      <header className="border-b border-[#E1E8E1] bg-white">

        <div className="mx-auto flex w-[92%] max-w-[1160px] items-center justify-between py-5">


          <Link
            to="/news"
            className="font-bold text-[#0B7A3B]"
          >
            ← Back to News
          </Link>



          <Link
            to="/"
            className="text-xl font-black text-[#064F26]"
          >
            YAYI <span className="text-[#F4A900]">2027</span>
          </Link>



        </div>


      </header>



      <main>

        <article className="mx-auto w-[92%] max-w-[950px] py-12 sm:py-16">


          <div className="text-center">


            <h1 className="text-[clamp(2rem,5vw,3.6rem)] font-black leading-tight text-[#064F26]">

              {post.title}

            </h1>



            <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm text-[#5C665F]">


              <span>

                {new Date(post.publishedAt).toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}

              </span>



              {post.author?.name && (

                <span>
                  • {post.author.name}
                </span>

              )}


            </div>
            
            {post.categories?.length ? (

              <div className="mt-5 flex flex-wrap justify-center gap-2">

                {post.categories.map((category) => (

                  <span
                    key={category.title}
                    className="rounded-full bg-[#F6F8F5] px-4 py-1 text-sm font-semibold text-[#0B7A3B]"
                  >
                    {category.title}
                  </span>

                ))}

              </div>

            ) : null}



          </div>




          {/* AUTHOR PROFILE */}


          {post.author && (

            <div className="mt-10 flex items-center justify-center gap-3">


              {post.author.image ? (

                <img
                  src={
                    urlFor(post.author.image)
                      .width(100)
                      .height(100)
                      .fit("crop")
                      .auto("format")
                      .url()
                  }
                  alt={post.author.name}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover"
                />

              ) : (

                <div className="grid h-12 w-12 place-items-center rounded-full bg-[#064F26] font-bold text-white">
                  Y
                </div>

              )}



              <div>

                <p className="text-sm font-bold text-[#064F26]">
                  {post.author.name}
                </p>


                <p className="text-xs text-[#5C665F]">
                  Author
                </p>


              </div>


            </div>

          )}





          {/* MAIN IMAGE */}


          {post.mainImage && (

            <img
              src={
                urlFor(post.mainImage)
                  .width(1200)
                  .height(700)
                  .fit("crop")
                  .auto("format")
                  .url()
              }
              alt={post.title}
              loading="lazy"
              className="
                mt-10
                aspect-video
                w-full
                rounded-3xl
                object-cover
                sm:mt-12
              "
            />

          )}






          {/* ARTICLE CONTENT */}


          <div
            className="
              mt-10
              text-base
              sm:mt-12
              sm:text-lg
            "
          >

            {post.body && (

              <PortableText
                value={post.body}
                components={portableComponents}
              />

            )}

          </div>

          {/* BACK BUTTON */}


          <div className="mt-12 border-t border-[#E1E8E1] pt-8">


            <Link

              to="/news"

              className="inline-flex rounded-full bg-[#064F26] px-6 py-3 font-bold text-white transition hover:bg-[#0B7A3B]"

            >
              ← Back to all news

            </Link>


          </div>




        </article>


      </main>



    </div>

  );

}