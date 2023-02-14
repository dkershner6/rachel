/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";

import clsx from "clsx";

import styles from "./styles.module.css";

type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<"svg">>;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: "Hey Rachel",
        Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
        description: (
            <>
                Poke poutine readymade, authentic pitchfork schlitz af
                shoreditch tattooed heirloom gastropub hot chicken beard
                gentrify hell of. Whatever iPhone glossier polaroid man braid
                mumblecore tumblr roof party. YOLO lyft drinking vinegar vegan.
                Fanny pack listicle cronut, cray affogato glossier actually
                tumblr pinterest kitsch. Sartorial fashion axe poutine 8-bit
                yuccie keffiyeh copper mug.
            </>
        ),
    },
    {
        title: "Feel Free to Ignore This",
        Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
        description: (
            <>
                Kombucha polaroid celiac microdosing sustainable intelligentsia.
                Everyday carry lyft post-ironic salvia drinking vinegar tbh
                biodiesel vaporware. Mustache cliche messenger bag franzen
                stumptown Brooklyn cronut four dollar toast vegan try-hard af
                schlitz mukbang bespoke kale chips. Selfies YOLO farm-to-table
                williamsburg, bicycle rights snackwave occupy helvetica copper
                mug pop-up. DSA tumeric tousled vape keffiyeh, tbh +1 sus
                franzen gatekeep truffaut copper mug air plant beard forage. Meh
                franzen JOMO marfa, deep v four loko tacos vibecession squid
                small batch DIY stumptown trust fund. Copper mug cred chambray
                hashtag, mukbang bicycle rights organic.
            </>
        ),
    },
    {
        title: "And This",
        Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
        description: (
            <>
                Williamsburg authentic tonx echo park XOXO fashion axe
                letterpress. Offal franzen literally DIY raclette skateboard
                food truck chillwave plaid. Tousled kogi praxis actually,
                leggings ramps cray flannel prism scenester. Cronut af hella
                selvage. Bodega boys normcore pickled readymade selvage viral
                pinterest taxidermy chicharrones try-hard forage celiac
                humblebrag narwhal 90's. Semiotics coloring book twee crucifix
                vinyl activated charcoal bushwick.
            </>
        ),
    },
];

function Feature({ title, Svg, description }: FeatureItem) {
    return (
        <div className={clsx("col col--4")}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
