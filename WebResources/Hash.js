var MyHash = window.MyHash || {};
(function () {
    this.attributeOnChange = async function (executionContext) {
        const formContext = executionContext.getFormContext();
        const plain = formContext.getAttribute('ya_message').getValue();
        if (plain) {
            async function digestMessage(message) {
                const msgUint8 = new TextEncoder().encode(message);
                const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                return hashHex;
            }
            const digestHex = await digestMessage(plain);
            console.log(plain, '=>', digestHex);
            formContext.getAttribute('ya_hashed').setValue(digestHex);
        }
    }
}).call(MyHash);
