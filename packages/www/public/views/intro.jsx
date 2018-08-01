import {RowBlock} from "@randy.tarampi/jsx";
import {HelloBear} from "@randy.tarampi/jsx/lib/components/bear";
import {
    EmailLink,
    GitHubLink,
    InstagramLink,
    LinkedInLink,
    PhotosAppLink
} from "@randy.tarampi/jsx/lib/components/link";
import React from "react";
import {Col} from "react-materialize";

const Intro = () =>
    <RowBlock name="intro">
        <Col className="block__bear" l={5} m={8} offset="m2">
            <HelloBear/>
        </Col>
        <Col className="block__text" l={7} m={8} offset="m2">
            <h2>
                <span className="text">Yo. Hi.</span>
            </h2>
            <p>
                <span className="text">'Sup? As you can see, there isn't really much to see here yet.</span>
            </p>
            <p>
                <span className="text">
                    Check me out on <GitHubLink useBranding={false} text="GitHub"/>, try and poach me on <LinkedInLink
                    useBranding={false} text="LinkedIn"/>, send me an <EmailLink useBranding={false} text="email"/> if you want to chat, or follow me on <InstagramLink
                    useBranding={false} text="Instagram"/> if you want to see some of my <PhotosAppLink text="photos"/>.
                </span>
            </p>
        </Col>
    </RowBlock>;

export default Intro;
