import Link from "next/link";
import { navLinks, siteInfo } from "@/data/site";

const destinations = ["Goa", "Kerala", "Dubai", "Maldives", "Manali", "Thailand"];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <h3>{siteInfo.name}</h3>
            <p>{siteInfo.description}</p>
            <p>{siteInfo.address}</p>
            <p>{siteInfo.hours}</p>
          </div>
          <div>
            <h3>Explore</h3>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Popular trips</h3>
            <ul>
              {destinations.map((name) => (
                <li key={name}>
                  <Link href="/holiday-packages">{name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Talk to us</h3>
            <ul>
              <li>
                <a href={`tel:${siteInfo.phone.replace(/\s/g, "")}`}>{siteInfo.phone}</a>
              </li>
              <li>
                <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
              </li>
              <li>
                <a href={`https://wa.me/${siteInfo.whatsapp.replace("+", "")}`} target="_blank" rel="noreferrer">
                  WhatsApp the desk
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="site-footer__base">
          <span>© {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</span>
          <span>Flights · Hotels · Holidays · Bus · Visa</span>
        </div>
      </div>
    </footer>
  );
}
