
const ProfilePreview = ({user}) => {
    const { _id, firstName, lastName, about, age, gender,skills } = user;
  return (
    
    <div>
    <div>
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
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
