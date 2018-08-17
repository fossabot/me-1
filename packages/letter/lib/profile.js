import {Record} from "immutable";

class Profile extends Record({
    network: null,
    username: null,
    url: null
}) {
    static fromJS(json) {
        return new Profile({
            ...json
        });
    }
}

export default Profile;