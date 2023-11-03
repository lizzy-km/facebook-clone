import { useCreateNewCollectionMutation } from "../redux/api/PhotoApi";

const CreateCollection = () => {
  const UserData = [
    {
      id: 206,
      title: "Makers: Cat and Ben",
      description:
        "Behind-the-scenes photos from the Makers interview with designers Cat Noone and Benedikt Lehnert.",
      published_at: "2016-01-12T18:16:09-05:00",
      last_collected_at: "2016-06-02T13:10:03-04:00",
      updated_at: "2016-07-10T11:00:01-05:00",
      featured: false,
      total_photos: 12,
      private: false,
      share_key: "312d188df257b957f8b86d2ce20e4766",
      cover_photo: null,
      user: null,
      links: {
        self: "https://api.unsplash.com/collections/206",
        html: "https://unsplash.com/collections/206/makers-cat-and-ben",
        photos: "https://api.unsplash.com/collections/206/photos",
      },
    },
  ];
  // useEffect(()=>{
  // const CreateNewCollection = useCreateNewCollectionMutation(UserData);
  // //(CreateNewCollection);
  // },[])
  return <div>Col</div>;
};

export default CreateCollection;
