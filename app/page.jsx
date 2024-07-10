import Feed from '@components/feed'
const HOME = () => {
  return (
    <section className='w-full flex-col flex-center'>
      <h1 className='head_text text-center'>
        <br className='mx-md:hidden' />
        <span className='orange_gradient text-center'>
          Hope International limited
        </span>
      </h1>
      <p className='text-center'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo
        officiis provident, aspernatur eveniet minima, beatae recusandae
        delectus ipsa quia suscipit perferendis. Dolor iure fuga at.
      </p>
      <Feed />
    </section>
  )
}

export default HOME
