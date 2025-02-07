
const ProfilePreview = ({user}) => {
    const { _id, firstName, lastName, about, age, gender,skills } = user;
  return (
    
    <div>
    <div>
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          alt="photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {/* {age && gender &&<p>{age+" "+gender}</p>} */}
        {age && <p>{age}</p>} {gender ? gender : "female"}
        <p>{skills}</p>
        <p>{about}</p>
      </div>
    </div>
  </div>
  </div>
  
  )
}

export default ProfilePreview
