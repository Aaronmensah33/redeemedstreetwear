import type { UserCardProps } from "../../types/oefeningen/userCard";


function UserCardComponent(props:UserCardProps){
    return(
    <div>
    <p>name:{props.name}</p>
    <p>gekocht:{props.gekocht ? "ja" : "nee"}</p>
    <p>Type iets:{props.myInput}</p>
    <p>saved:{props.savedInput.myInput}</p>
    </div>
    )
}
export default UserCardComponent