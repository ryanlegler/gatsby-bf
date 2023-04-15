import * as React from "react";

const manageID = process.env.GATSBY_MANAGE_ID;

const Publish = ({ location }) => {
    const searchParams = new URLSearchParams(location.search)?.get("auth");
    console.log("searchParams", searchParams);
    console.log("GATSBY_MANAGE_ID", manageID);

    const url = "https://api.netlify.com/build_hooks/5f8d058b463aed0087a7101d";
    const handlePublish = () => {
        console.log("url", url);

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "Publish",
                content: "Publish",
            }),
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Publish</h1>
            {searchParams === manageID ? (
                <div>
                    <h3>
                        <span style={{ color: "green" }}>🔑 Authorized</span>
                        <span> - Ready to Publish Changes</span>
                    </h3>
                    <button onClick={handlePublish}>Publish Now</button>
                </div>
            ) : (
                <>
                    <h3>
                        <p>
                            <span style={{ color: "red" }}> 🚫 Access Denied</span> - To login make
                            sure your url looks like this:
                        </p>
                        <code
                            style={{
                                background: "#666",
                                padding: "10px",
                                color: "white",
                                borderRadius: "10px",
                            }}
                        >
                            https://brendonfarrell.netlify.app/publish/?auth=[PASSWORD]
                        </code>
                    </h3>
                    <p style={{ color: "grey" }}>* don't include the "[" or "]" in the url</p>
                </>
            )}
        </div>
    );
};

export default Publish;
