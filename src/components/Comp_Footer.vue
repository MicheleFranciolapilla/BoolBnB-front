<script>

    export default
    {
        name        :   "Comp_Footer",
        data()
        {
            return {

            }
        },
        mounted()
        {
           
        },
        methods: 
        {

        }
    }
</script>

<template>
    <footer>
        <div class="container d-flex justify-content-between align-items-center">
            <section>
                <div class="text-center">
                    <ul>
                        <li class="mt-1" id="paragrafi">Informazioni</li>
                    </ul>
                </div>
                <div class="d-flex">
                    <ul class="flex-column align-items-center">
                        <li class="mt-1">
                            <a href="">Chi Siamo</a>
                        </li>
                        <li class="mt-1"></li>
                        <li class="mt-1">Lavora con noi</li>
                        <li class="mt-1">Marchio</li>
                    </ul>
                    <ul class="flex-column align-items-center">
                        <li class="mt-1">Sede</li>
                        <li class="mt-1">Assistenza</li>
                    </ul>       
                </div>
            </section>
            <section>
                <div class="text-center">
                    <ul>
                        <li class="mt-1" id="paragrafi">Norme</li>
                    </ul>
                </div>
                <div class="d-flex">
                    <ul class="flex-column align-items-center">
                        <li class="mt-1"> Privacy</li>
                        <li class="mt-1">Termini</li>
                        <li class="mt-1">Sicurezza</li>
                    </ul>
                    <ul class="flex-column align-items-center">
                        <li class="mt-1">Licenze</li>
                        <li class="mt-1">Cookie</li>
                        <li class="mt-1">Piani</li>
                    </ul>       
                </div>
            </section>
            <section>
                <div class="mt-2">
                    <ul>
                        <li class="mt-1 text-center" id="paragrafi">Partner</li>
                        <li>
                            <img src="\TomTom.png" alt="" id="logo-partner1">
                        </li>
                        <li>
                            <img src="\braintree-logo-black.png" alt="" id="logo-partner2">
                        </li>
                    </ul>
                </div>
            </section>
        </div>
        <div class="container">
            <hr>
        </div>
        <div class="container d-flex justify-content-between align-items-center">
            <div>
                <img src="\BoolBnB.png" alt="">
                <span>&#169; BoolBnB 2023</span>
            </div>
            <div class="registrazione">
                <button class="btn btn-primary" id="footer-button">
                    <a href="http://127.0.0.1:8000/register">Registrati</a>
                </button>
            </div>
        </div>
    </footer>
</template>


<style>

footer {
    background-color: rgb(29,116,101);
    color: white;
}

footer li{
    list-style-type: none;
    color: rgb(214,222,35);
}

footer a{
    text-decoration: none !important;
    color: rgb(214,222,35) !important;
}


footer img{
    width: 50%;
    height: 60px;
}

footer hr{
    color: rgb(214,222,35);
}

#logo-partner1{
    width: 50%;
}

#logo-partner2{
    width: 60%;
}

#footer-button{
    color: rgb(208,219,35) !important;
    border-color: rgb(208,219,35) !important;
    background-color: rgb(29,116,101);
}

#footer-button:hover{
    background-color: rgb(208,219,35) !important;
}

#footer-button a:hover{
    color: rgb(3,97,57) !important;
    border-color: rgb(3,97,57) !important;
}

#paragrafi{
    color: white;
}

</style>