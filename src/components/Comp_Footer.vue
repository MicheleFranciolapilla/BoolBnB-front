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
                <div class="mt-2">
                    <ul>
                        <li id="paragrafi">Progetto di</li>
                        <li class="mt-2">
                            <a href="https://github.com/MicheleFranciolapilla">Michele Franciolapilla</a>
                        </li>
                        <li class="mt-2">                        
                            <a href="https://github.com/LeonardoRinaldi92">Leonardo Rinaldi</a>
                        </li>
                        <li class="mt-2">
                            <a href="https://github.com/edoardope">Edoardo Penco</a>
                        </li>
                        <li class="mt-2">
                            <a href="https://github.com/RiccardoSignorini">Riccardo Signorini</a>
                        </li>
                        <li class="mt-2">
                            <a href="https://github.com/AndreaFerrini">Andrea Ferrini</a>
                        </li>
                    </ul>       
                </div>
            </section>
            <section>
                <div class="mt-2">
                    <ul>
                        <li class="mt-2" id="paragrafi">Norme</li>
                        <li class="mt-2">Termini</li>
                        <li class="mt-2">Privacy</li>
                        <li class="mt-2">Cookies</li>
                        <li class="mt-2">Sicurezza</li>
                        <li class="mt-2">Licenze</li>
                    </ul>
                </div>
            </section>
            <section>
                <div class="mt-2">
                    <ul>
                        <li class="mt-2 text-center" id="paragrafi">Partner</li>
                        <li>
                            <img src="public\TomTom.png" alt="" id="logo-partner1">
                        </li>
                        <li>
                            <img src="public\braintree-logo-black.png" alt="" id="logo-partner2">
                        </li>
                    </ul>
                </div>
            </section>
        </div>
        <div class="container d-flex justify-content-between align-items-center">
            <div>
                <img class="img-fluid" src="public\BoolBnB.png" alt="">
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
    background-color: rgb(0,85,46);
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
    width: 100px;
    height: 100px;
}

#logo-partner1{
    width: 250px;
    height: 100px;
}

#logo-partner2{
    width: 250px;
    height: 50px;
}

#footer-button{
    color: rgb(208,219,35) !important;
    border-color: rgb(208,219,35) !important;
    background-color: rgb(0,85,46) !important;
}

#paragrafi{
    color: white;
}

</style>