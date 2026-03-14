import { Mail, PencilLine, X } from "lucide-react";
import { sendContactMessage } from "@/libs/api/contact";
import { useLanguageStore } from "@/libs/languageStore";
import { useEffect, useState } from "react";

type OverlayKind = "contact" | "email" | null;

type Props = {
  overlay?: boolean;
};

export default function PortfolioHeader({ overlay = false }: Props) {
  const { lang, setLang } = useLanguageStore();
  const [activeOverlay, setActiveOverlay] = useState<OverlayKind>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!activeOverlay) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveOverlay(null);
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [activeOverlay]);

  const closeOverlay = () => setActiveOverlay(null);
  const toggleLanguage = () => setLang(lang === "en" ? "ko" : "en");

  const isEmailDisabled =
    emailSending || emailSubject.trim().length === 0 || emailBody.trim().length === 0;

  const handleEmailSend = async () => {
    if (isEmailDisabled) return;

    setEmailSending(true);
    setEmailStatus(null);

    try {
      await sendContactMessage({
        name: "Portfolio Header",
        email: "mds6425@gmail.com",
        subject: emailSubject.trim(),
        message: emailBody.trim(),
      });

      setEmailStatus("Sent successfully.");
      setEmailSubject("");
      setEmailBody("");
    } catch (error) {
      console.error("Failed to send email from header modal:", error);
      setEmailStatus("Failed to send. Please try again.");
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <>
      <header className={overlay ? "absolute inset-x-0 top-0 z-30 px-3 pt-3 sm:px-5 sm:pt-4 lg:px-6" : "px-3 pt-3 sm:px-5 sm:pt-4 lg:px-6"}>
        <div className="portfolio-header-shell">
          <a className="portfolio-nav portfolio-nav-brand portfolio-nav-active" href="/">
            Raina To The Moon
          </a>

          <nav className="portfolio-header-actions">
            <a className="portfolio-nav portfolio-nav-button min-w-0" href="/troubleshooting">
              <span className="flex items-center gap-2">
                <PencilLine className="h-3.5 w-3.5" />
                Publish
              </span>
              <span className="hidden text-[10px] tracking-[0.16em] text-black/35 sm:inline">Troubleshooting</span>
            </a>

            <button
              type="button"
              className="portfolio-nav portfolio-nav-button min-w-0 text-left"
              onClick={() => setActiveOverlay("contact")}
            >
              <span>Contact</span>
              <span className="hidden text-[10px] tracking-[0.16em] text-black/35 sm:inline">Links & socials</span>
            </button>

            <button
              type="button"
              className="portfolio-nav portfolio-nav-language justify-center"
              onClick={toggleLanguage}
              aria-label={`Switch language to ${lang === "en" ? "Korean" : "English"}`}
            >
              {lang === "en" ? "KO" : "EN"}
            </button>

            <button
              type="button"
              className="portfolio-nav portfolio-nav-icon justify-center"
              onClick={() => setActiveOverlay("email")}
              aria-label="Open email modal"
            >
              <Mail className="h-3.5 w-3.5" />
            </button>
          </nav>
        </div>
      </header>

      {activeOverlay && (
        <div
          className="fixed inset-0 z-[2200] flex items-start justify-center bg-black/28 px-4 py-24 backdrop-blur-sm sm:items-center"
          onClick={closeOverlay}
        >
          <div
            className="portfolio-dialog w-full max-w-sm"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="portfolio-dialog-close"
              onClick={closeOverlay}
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {activeOverlay === "contact" ? (
              <>
                <div className="portfolio-dialog-kicker">Contact</div>
                <h2 className="portfolio-dialog-title">Find me as a developer</h2>
                <p className="portfolio-dialog-copy">
                  Pick the channel that fits code, work, or a quick introduction.
                </p>

                <div className="mt-5 grid gap-3">
                  <a
                    className="portfolio-contact-link"
                    href="https://www.linkedin.com/in/daseul-moon-8b064128b/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="portfolio-contact-emoji">💼</span>
                    <span>
                      <strong>LinkedIn</strong>
                      <small>Career, work history, intros</small>
                    </span>
                  </a>
                  <a
                    className="portfolio-contact-link"
                    href="https://github.com/Raina-Moon"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="portfolio-contact-emoji">💻</span>
                    <span>
                      <strong>GitHub</strong>
                      <small>Code, experiments, repositories</small>
                    </span>
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="portfolio-dialog-kicker">Email</div>
                <h2 className="portfolio-dialog-title">Send me an email</h2>
                <p className="portfolio-dialog-copy">
                  Write a subject and message, then send it directly to me.
                </p>

                <div className="mt-5 rounded-[18px] border border-black/8 bg-white/75 p-4">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-black/36">To</div>
                  <div className="mt-2 font-medium text-black/78">mds6425@gmail.com</div>
                </div>

                <div className="mt-5 grid gap-3">
                  <label className="portfolio-field">
                    <span className="portfolio-field-label">Subject</span>
                    <input
                      className="portfolio-field-input"
                      type="text"
                      value={emailSubject}
                      onChange={(event) => {
                        setEmailSubject(event.target.value);
                        if (emailStatus) setEmailStatus(null);
                      }}
                      placeholder="What is this about?"
                    />
                  </label>

                  <label className="portfolio-field">
                    <span className="portfolio-field-label">Message</span>
                    <textarea
                      className="portfolio-field-input portfolio-field-textarea"
                      value={emailBody}
                      onChange={(event) => {
                        setEmailBody(event.target.value);
                        if (emailStatus) setEmailStatus(null);
                      }}
                      placeholder="Write your message here."
                    />
                  </label>
                </div>

                {emailStatus && (
                  <p className="mt-4 text-sm text-black/56">{emailStatus}</p>
                )}

                <button
                  type="button"
                  className="portfolio-email-cta mt-5"
                  onClick={handleEmailSend}
                  disabled={isEmailDisabled}
                >
                  <Mail className="h-4 w-4" />
                  {emailSending ? "Sending" : "Send"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
