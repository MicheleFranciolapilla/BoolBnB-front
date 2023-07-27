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
                <div class="">
                    <ul>
                        <li>Contatti Github</li>
                        <li>
                            <a href="https://github.com/MicheleFranciolapilla">Michele Franciolapilla</a>
                        </li>
                        <li>                        
                            <a href="https://github.com/LeonardoRinaldi92">Leonardo Rinaldi</a>
                        </li>
                        <li>
                            <a href="https://github.com/edoardope">Edoardo Penco</a>
                        </li>
                        <li>
                            <a href="https://github.com/RiccardoSignorini">Riccardo Signorini</a>
                        </li>
                        <li>
                            <a href="https://github.com/AndreaFerrini">Andrea Ferrini</a>
                        </li>
                    </ul>       
                </div>
            </section>
            <section>
                <div class="">
                    <ul>
                        <li>Norme</li>
                        <li>Termini</li>
                        <li>Privacy</li>
                        <li>Impostazione Cookies</li>
                        <li>Sicurezza</li>
                        <li>Licenze</li>
                    </ul>
                </div>
            </section>
        </div>
        <div class="container d-flex">
            <img class="img-fluid" src="public\Logo BoolBnB.png" alt="">
        
            <div class="registrazione">
                <a class="btn btn-primary" href="http://127.0.0.1:8000/register">Registrati</a>
            </div>
        </div>
    </footer>
</template>


<style>

footer {
    background-color: rgb(24, 22, 22);
    color: white;
}

</style>