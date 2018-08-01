import {RowBlock} from "@randy.tarampi/jsx";
import {DoubtBear} from "@randy.tarampi/jsx/lib/components/bear";
import Link from "@randy.tarampi/jsx/lib/components/link";
import React from "react";
import {Col} from "react-materialize";

const Code = () =>
    <RowBlock name="code">
        <Col className="block__text" l={7} m={8} offset="m2">
            <h2>
                <span className="text">If you insist on knowing more...</span>
            </h2>
            <p>
                <span className="text">I've built a couple things of note that you might be interested in if you're into software. <Link
                    href="https://github.com/randytarampi/randytarampi.github.io" text="This page"/> you're currently looking at, <Link
                    href="https://github.com/randytarampi/me/tree/master/packages/posts#readme" text="that Photo blog"/> I was shilling earlier, a <Link
                    href="https://github.com/randytarampi/pseudolocalize.woof"
                    text="string pseudolocalization library"/>, and an <Link
                    href="https://github.com/randytarampi/pseudolocalize.woof" text="image pseudolocalization library"/>.</span>
            </p>
        </Col>
        <Col className="block__bear hide-on-med-and-down" l={5}>
            <DoubtBear/>
        </Col>
    </RowBlock>;

export default Code;
