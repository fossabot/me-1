import Gallery from "../gallery";
import Photo from "../photo";
import Post from "../post";

export const getEntityForType = type => {
    switch (type) {
        case Gallery.type:
            return Gallery;

        case Photo.type:
            return Photo;

        case Post.type:
            return Post;

        default:
            throw new Error(`Can't \`getEntityForType\` for \`${type}\``);
    }
};

export default getEntityForType;
