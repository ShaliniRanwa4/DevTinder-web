import { useSelector } from "react-redux"

const ProfilePreview = () => {
  const user=useSelector((store)=>store.user)
    const {  firstName, lastName, about, age, gender,skills ,photoUrl} = user;
    
  return (
    
  //   <div>
  //   <div>
  //   <div className="card bg-base-300 w-96 shadow-xl">
  //     <figure>
  //       <img
  //         src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
  //         alt="photo"
  //       />
  //     </figure>
  //     <div className="card-body">
  //       <h2 className="card-title">{firstName + " " + lastName}</h2>
  //       {/* {age && gender &&<p>{age+" "+gender}</p>} */}
  //       {age && <p>{age}</p>} {gender ? gender : "female"}
  //       <p>{skills}</p>
  //       <p>{about}</p>
  //     </div>
  //   </div>
  // </div>
  // </div>
  

  <div className="flex justify-center w-full md:w-auto">
      <div className="card bg-base-300 w-full md:w-80 shadow-lg hover:shadow-xl transition rounded-lg p-4">
        {/* Profile Image */}
        <figure className="p-4 flex justify-center">
          <img
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            src={photoUrl || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"}
            alt="Profile"
          />
        </figure>

        {/* Card Body */}
        <div className="card-body text-center">
          <h2 className="card-title text-2xl font-bold text-white">{firstName + " " + lastName}</h2>

          {/* Age & Gender */}
          <p className="text-lg font-semibold text-gray-300">
            {age ? `${age} years old` : "Age not specified"} • {gender || "Not specified"}
          </p>

          {/* Skills */}
          {skills && (
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-white">Skills:</span> {skills}
            </p>
          )}

          {/* About */}
          {about && (
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-white">About:</span> {about}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePreview
