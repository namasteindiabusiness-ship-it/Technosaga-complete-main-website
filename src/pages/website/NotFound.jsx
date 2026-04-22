import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <style>
        {`
          .notfound {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: #f8f9fa;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            padding: 20px;
          }

          .notfound-container {
            text-align: center;
            max-width: 500px;
          }

          .notfound-code {
            font-size: 8rem;
            font-weight: 900;
            margin: 0;
            line-height: 1;
            background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .notfound-title {
            font-size: 2rem;
            margin-top: 10px;
            color: #2d3436;
          }

          .notfound-text {
            font-size: 1.1rem;
            color: #636e72;
            margin: 20px 0 30px;
          }

          .notfound-btn {
            display: inline-block;
            padding: 12px 30px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            transition: transform 0.2s, background-color 0.2s;
            box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
          }

          .notfound-btn:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
          }
        `}
      </style>

      <section className="notfound">
        <div className="notfound-container">
          <h1 className="notfound-code">404</h1>
          <h2 className="notfound-title">Page Not Found</h2>

          <p className="notfound-text">
            Oops! The page you are looking for doesn’t exist or has been moved.
          </p>

          <div className="notfound-actions">
            <Link to="/" className="notfound-btn">
              Go to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
