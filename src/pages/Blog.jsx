import BlogCard from '../Components/UiElements/BlogCard/BlogCard';
import Breadcrumb from '../Components/UiElements/Breadcrumb/Breadcrumb';
import { posts } from '../Store/Data';
import Paginate from '../Components/UiElements/Paginate/Paginate';
const Blog = () => {
    return (
        <>
        <Breadcrumb />
        <div className='container mx-auto my-12'>
           <div className="grid grid-cols-1 sm:grid-cols-4 px-5 sm:px-0 gap-8">
            {posts.slice(0,20).map(post =>{
                return (

                    <BlogCard key={post.id} id={post.id} image={`https://source.unsplash.com/random/900×70${post.id}/?nature`} title={post.title} description={post.body} />
                )
            })}
           </div>
           <div className="flex justify-center my-12">

           <Paginate totalPage={20}  />
           </div>
        </div>
        </>
    );
};

export default Blog;