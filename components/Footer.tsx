
export default function Footer(){
    return(<footer id="footer">
            <div className="container">
                <div className="row gtr-200">
                    <div className="col-12">
                            <section>
                                <h2 className="major"><span>Get in touch with us</span></h2>
                                <ul className="contact">
                                    <li><a className="icon brands fa-regular fa-linkedin-in" href="https://www.linkedin.com/in/monasoni/"><span className="label">LinkedIn</span></a></li>
                                    <li><a className="icon fa-regular fa-envelope" href="mailto:mona.soni@sostibl.com"><span className="label">Email</span></a></li>
                                </ul>
                            </section>

                    </div>
                </div>
                    <div id="copyright">
                        <ul className="menu">
                            <li>&copy; All rights reserved</li>
                        </ul>
                    </div>
            </div>
        </footer>)
}