import headerStyles from '../styles/Header.module.css'

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>To</span>do
      </h1>
      <p className={headerStyles.description}>
      List your task
      </p>
    </div>
  )
}

export default Header
