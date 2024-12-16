const UserCard = ({ user }) => {
  const { firstName, lastName, about, photoUrl, age, gender } = user;

  // console.log(user)
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img
            src="https://avatars.githubusercontent.com/u/176595043?v=4"
            alt="photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {/* {age && gender &&<p>{age+" "+gender}</p>} */}
          {age && <p>{age}</p>} {gender ? gender : "female"}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-outline btn-info">Ignore</button>
            <button className="btn btn-outline btn-success">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;