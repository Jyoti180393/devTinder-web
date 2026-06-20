const UserCard = ({ isFeed, user }) => {
  const { firstName, age, photoUrl, about, skills } = user;

  return (
    <div className="shadow-sm max-w-lg rounded-2xl">
      <div id="slide1" className="carousel-item relative w-full group">
        <div
          className={
            isFeed
              ? "w-100 relative overflow-hidden rounded-2xl"
              : "w-full h-64 sm:h-80 md:h-120 relative overflow-hidden rounded-2xl"
          }
        >
          <img
            src={photoUrl}
            alt={firstName + "'s photo"}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full p-4 text-white z-10 bg-black/50">
            <div className="flex gap-2 text-2xl font-medium mb-1">
              <span>{firstName}</span>
              {age && <span>{age}</span>}
            </div>
            <div className="font-medium">{about}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
            ></svg>
            <div className="font-medium my-2">
              {skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-600 w-auto rounded-2xl py-1 px-2 mr-2 inline-block"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute left-2 right-2 top-1/2 transform justify-between hidden group-hover:flex">
          <button href="#slide4" className="btn btn-circle">
            ❮
          </button>
          <button href="#slide2" className="btn btn-circle">
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

{
  /* <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Card Title</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
    */
}
