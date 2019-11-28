// attribute option

const btnFlagChecker = function(data){
    const {} = data;
    const $tg = $matchProductList.find(".btn-area");
    const keyArray = object.keys(btnAttr);
    const push = [
        "wtbExternalLinkUse",
        "wtbExternalLinkSelf",
    ]
    $tg.find(".link-text").attr(btnAttr[ keyArray[0] + "Flag"]).text(data.productMessages[keyArray[0] + "BtnNm"]);
}

const btnAttr = {
    addToCart : {
        btnOpt : function(data){
            return {
                "data-model-id" : data.modelId,
                "role" : "button",
                "href" : "#"
            };
        },
        linkOpt : function(data){
            return {
                "data-model-id" : data.modelId,
                "href" : data.obsProductUrl,
                "title" : data.btnNewLinkTitle
            };
        },
        localLinkOpt : function(data){
            return {
                "data-model-id" : data.modelId,
                "href" : data[a + "Url"],
                "target" : "_blank",
                "title" : data.btnNewLinkTitle
            };
        },
        externalBtnKeys : [
            "obsProduct",
            "bookOnline",
            "buyNow",
            "reseller",
            "productSupport"
        ]
    },
    whereToBuy : {
        pdpOpt : function(data){
            return {
                "href" : data[a + "Url"]
            };
        },
        externalOpt : function(data){
            if(data.wtbExternalLinkSelfFlag === "Y"){                
                return {
                    "href" : data.wtbExternalLinkUrl,
                    "target" : "_blank",
                    "title" : data.btnNewLinkTitle
                };
            }
            return {
                "href" : data.wtbExternalLinkUrl 
            };
        },
        externalBtnKeys : [
            "wtbExternalLink"
        ]
    },
    findTheDealer : {
        opt : function(data){
            return {
                "href" : data[a + "Url"]
            };
        }
    },
    inquiryToBuy : {
        opt : function(data){
            return {
                "href" : data[a + "Url"]
            };
        }
    }
}