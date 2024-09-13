
import React from "react";
 const bodyAds=()=>{
    return(
        <div>
            {/* Insert your adsense code here */}
            <div className="adsense">
                <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <ins className="adsbygoogle"
                    style={{display: 'block', margin: '0 auto', width: '728px', height: '90px'}}
                    data-ad-client="ca-pub-12345678901234567890"
                    data-ad-slot="1234567890"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>
        </div>
        
    )
}
export default bodyAds;