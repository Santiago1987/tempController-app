import { UserManag } from "../../../types";

interface props {
  user: UserManag;
  handleOnChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserComponent = ({ user, handleOnChange }: props) => {
  let { id, userName, email } = user;

  return (
    <div>
      <input type="text" value={id} onChange={handleOnChange} />
      <label>Nombre de usuario</label>
      <input type="text" value={userName} onChange={handleOnChange} />
      <label>Email</label>
      <input type="email" value={email} onChange={handleOnChange} />
    </div>
  );
};

export default UserComponent;
