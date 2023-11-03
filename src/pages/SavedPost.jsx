import { useState } from "react";

const SavedPost = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <div>
      {isShow && <p> Detail </p>}
      {!isShow && <p> Hide Detail </p>}
      <button onClick={() => setIsShow(!isShow)}>Click</button>
    </div>
  );
};

export default SavedPost;
