export const ContactPage = () => {
  return (
    <section className="section pb-5">
      <div className="container">
        <div className="row mb-5 align-items-end">
          <div className="col-md-6" data-aos="fade-up">
            <h2>Kontaktuj nás</h2>
            <p className="mb-0">
              Máš nápad na tip #nekaslinasebe nebo na vylepšení? Chceš nám dát zpětnou vazbu?
              Neváhej nám napsat a posdílet své zkušenosti. Předem za celý tým Kpsychologovi
              děkujeme.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-5 mb-md-0" data-aos="fade-up">
            <form action="/forms/contact.php" method="post" role="form" className="php-email-form">
              <div className="row gy-3">
                <div className="col-md-6 form-group">
                  <label htmlFor="name">Jméno</label>
                  <input type="text" name="name" className="form-control" id="name" required />
                </div>
                <div className="col-md-6 form-group">
                  <label htmlFor="email">E-mail</label>
                  <input type="email" className="form-control" name="email" id="email" required />
                </div>
                <div className="col-md-12 form-group">
                  <label htmlFor="subject">Předmět</label>
                  <input type="text" className="form-control" name="subject" id="subject" required />
                </div>
                <div className="col-md-12 form-group">
                  <label htmlFor="message">Chci vám napsat:</label>
                  <textarea
                    className="form-control"
                    name="message"
                    cols={30}
                    rows={10}
                    id="message"
                    required
                  ></textarea>
                </div>

                <div className="col-md-12 my-3">
                  <div className="loading">Načítám</div>
                  <div className="error-message"></div>
                  <div className="sent-message">
                    Děkujeme, tvoje zpráva byla úspěšně odeslána.
                  </div>
                </div>

                <div className="col-md-6 mt-0 form-group">
                  <input type="submit" className="readmore d-block w-100" value="Odeslat" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
