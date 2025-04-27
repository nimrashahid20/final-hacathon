import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Company Info</h2>
          <p className="text-gray-400 text-sm">
            A leading platform for managing employee records, performance, and more.
          </p>
        </div>

        {/* Team & Resources */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Team & Resources</h2>
          <ul className="space-y-2">
            <li><Link to="/teams" className="text-gray-400 hover:text-white">Our Teams</Link></li>
            <li><Link to="/resources" className="text-gray-400 hover:text-white">Resources</Link></li>
            <li><Link to="/training" className="text-gray-400 hover:text-white">Training</Link></li>
            <li><Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
          </ul>
        </div>

        {/* HR Services */}
        <div>
          <h2 className="text-xl font-semibold mb-4">HR Services</h2>
          <ul className="space-y-2">
            <li><Link to="/payroll" className="text-gray-400 hover:text-white">Payroll</Link></li>
            <li><Link to="/benefits" className="text-gray-400 hover:text-white">Employee Benefits</Link></li>
            <li><Link to="/leave-management" className="text-gray-400 hover:text-white">Leave Management</Link></li>
            <li><Link to="/performance-reviews" className="text-gray-400 hover:text-white">Performance Reviews</Link></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <Link to="https://facebook.com" className="text-gray-400 hover:text-white text-2xl">
              <FaFacebook />
            </Link>
            <Link to="https://twitter.com" className="text-gray-400 hover:text-white text-2xl">
              <FaTwitter />
            </Link>
            <Link to="https://instagram.com" className="text-gray-400 hover:text-white text-2xl">
              <FaInstagram />
            </Link>
            <Link to="https://linkedin.com" className="text-gray-400 hover:text-white text-2xl">
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        © 2025 YourCompany. All Rights Reserved.
      </div>
    </footer>
  );
}
