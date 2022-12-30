import { NextApiResponse} from "next";
import { updateItem} from "../../infrastructure/firebase";
import {use} from "next-api-route-middleware";
import {NextApiRequestWithUser, validateMethod, validateUser} from "../../utils/validateUser";


function isValidName(newName: string) {
    return newName.length <= 120;
}


function isValidLinkUrl(newLinkUrl: string) {
    return newLinkUrl.length <= 500 && newLinkUrl.startsWith('http');
}

export default use(validateMethod('POST'), validateUser, async (
    req: NextApiRequestWithUser,
    res: NextApiResponse
) => {

    try {
        const email = req.headers.email;
        const item = req.body.item;
        console.log('update item', {email, item});

        const newName = item?.name?.trim();
        const newLinkUrl = item?.linkUrl?.trim();

        if (!isValidName(newName) || !isValidLinkUrl(newLinkUrl)) {
            console.log('update item: invalid name or linkUrl');
            return res.status(400).json({message: 'Bad request'});
        }

        await updateItem(email, item.codeId, newName, newLinkUrl);

        res.status(200).json({item});
    }
    catch (e) {
        console.error(e)
        return res.status(500).json({})
    }

});