function Feature({ icon, title, description }) {
  return (
    <div className="feature-item">
      <img src={icon} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Feature;
