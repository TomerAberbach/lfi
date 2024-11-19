import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Heading from '@theme/Heading'
import CodeInline from '@theme/CodeInline'
import Link from '@docusaurus/Link'
import Logo from '@site/static/img/logo.svg'
import CodeBlock from '@theme/CodeBlock'
import dedent from 'dedent'

const Home = () => {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title='Home' description={siteConfig.tagline}>
      <div className='space-y-8 sm:space-y-10'>
        <Header />
        <main className='px-6 sm:px-12 2xl:px-24 py-10'>
          <Features />
        </main>
      </div>
    </Layout>
  )
}

const Header = () => {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className='text-center flex flex-col items-center gap-6 bg-smores-200 dark:bg-mud-700 py-14 sm:py-16 px-8'>
      <Logo className='w-80 sm:w-96 max-w-full' />
      <div className='flex flex-col items-center gap-0.5'>
        <Heading
          as='h1'
          className='text-balance font-normal w-[40ch] max-w-full text-2xl sm:text-3xl'
        >
          <strong>
            <CodeInline>{siteConfig.title}</CodeInline>
          </strong>
          {` `}
          is a lazy functional sync, async, and concurrent iteration library
        </Heading>
        <Link
          href='/docs/getting-started'
          className='text-lg sm:text-xl bg-smores-700 dark:bg-mud-950 text-smores-50 dark:text-mud-50 hover:text-smores-50 dark:hover:text-smores-50 hover:no-underline hover:bg-smores-800 dark:hover:bg-mud-900 transition-colors duration-200 rounded-full px-5 sm:px-6 py-2 sm:py-3'
        >
          Get started
        </Link>
      </div>
    </header>
  )
}

const Features = () => (
  <section className='flex gap-8 sm:gap-10 flex-wrap'>
    {FEATURES.map(({ title, content }, index) => (
      <div
        key={index}
        className='flex-grow basis-[calc((60rem-100%)*999)] min-w-0'
      >
        <Heading as='h3'>{title}</Heading>
        {content}
      </div>
    ))}
  </section>
)

type FeatureItem = {
  title: string
  content: JSX.Element
}

const FEATURES: readonly FeatureItem[] = [
  {
    title: `🦥 Lazy and memory efficient`,
    content: (
      <>
        <p>
          <CodeInline>lfi</CodeInline> delays applying operations until their
          results are needed.
        </p>
        <CodeBlock language='js' metastring='playground'>{dedent`
          import { filter, flatMap, map, pipe, reduce, toSet } from 'lfi'
          import zoo from 'zoo'

          const getSlothNamesWithLfi = () =>
            pipe(
              zoo.exhibits,
              // No arrays created anywhere here
              flatMap(exhibit => exhibit.animals),
              filter(animal => animal.species === \`sloth\`),
              map(sloth => sloth.name),
              // And then a set is created here
              reduce(toSet()),
            )
          console.log(getSlothNamesWithLfi())

          const getSlothNamesWithoutLfi = () => {
            const slothNames = zoo.exhibits
              // An array is created here...
              .flatMap(exhibit => exhibit.animals)
              // And here...
              .filter(animal => animal.species === \`sloth\`)
              // And here...
              .map(sloth => sloth.name)
            // And then a set is created here
            return new Set(slothNames)
          }
          console.log(getSlothNamesWithoutLfi())
        `}</CodeBlock>
      </>
    ),
  },
  {
    title: `🌳 Small and tree shakeable`,
    content: (
      <>
        <p className='mb-3'>
          <CodeInline>lfi</CodeInline> is just
          {` `}
          <Link href='https://bundlejs.com/?text=export%20*%20from%20%27lfi%27&bundle'>
            5.47 kB gzipped
          </Link>
          , or even smaller when
          {` `}
          <Link href='https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking'>
            tree shaking
          </Link>
          .
        </p>
        <p className='mb-3'>
          <CodeInline>lfi</CodeInline>&rsquo;s functions are automatically
          {` `}
          <Link href='/docs/concepts/currying'>curried</Link>
          {` `}
          and their parameters are perfectly arranged for use in the
          {` `}
          <CodeInline>pipe</CodeInline> function, which provides a syntax
          similar to
          {` `}
          <Link href='https://en.wikipedia.org/wiki/Method_chaining'>
            method chaining
          </Link>
          {` `}
          without giving up tree shaking.
        </p>
        <p>
          The result? The functions imported in the code below bundle to just
          {` `}
          <Link href='https://bundlejs.com/?text=export%20{%20filter,%20flatMap,%20map,%20pipe,%20reduce,%20toGrouped,%20toMap,%20toSet%20}%20from%20%27lfi%27&bundle'>
            790 B gzipped
          </Link>
          !
        </p>
        <CodeBlock language='js' metastring='playground'>{dedent`
          import { filter, flatMap, map, pipe, reduce, toGrouped, toMap, toSet } from 'lfi'
          import zoo from 'zoo'

          const getSlothNamesByAge = zoo =>
            pipe(
              zoo.exhibits,
              flatMap(exhibit => exhibit.animals),
              filter(animal => animal.species === \`sloth\`),
              map(sloth => [sloth.age, sloth.name]),
              reduce(toGrouped(toSet(), toMap())),
            )

          console.log(getSlothNamesByAge(zoo))
          //=> Map(3) {
          //=>   7 => Set(2) { 'strawberry', 'bitsy' },
          //=>   19 => Set(1) { 'max' },
          //=>   24 => Set(1) { 'tommy' },
          //=> }
        `}</CodeBlock>
      </>
    ),
  },
  {
    title: `🔀 Concurrent iteration`,
    content: (
      <>
        <p>
          <CodeInline>lfi</CodeInline>&rsquo;s
          {` `}
          <Link href='/docs/concepts/concurrent-iterable'>
            concurrent iterables
          </Link>
          {` `}
          offer superior performance over
          {` `}
          <Link href='https://github.com/sindresorhus/p-map'>
            <CodeInline>p-map</CodeInline>
          </Link>
          ,{` `}
          <Link href='https://github.com/sindresorhus/p-filter'>
            <CodeInline>p-filter</CodeInline>
          </Link>
          , and others, because each item flows through the operations
          independently of other items.
        </p>
        <CodeBlock language='js' metastring='playground'>{dedent`
          import { asConcur, filterConcur, mapConcur, pipe, reduceConcur, toArray } from 'lfi'
          import pFilter from 'p-filter'
          import pMap from 'p-map'

          // Hypothetical delays for each item
          const mapDelays = [5, 1, 1]
          const filterDelays = [1, 1, 5]

          const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
          const mapFn = i => delay(mapDelays[i] * 1000).then(() => i)
          const filterFn = i => delay(filterDelays[i] * 1000).then(() => true)

          // Takes 6 seconds! Each item flows through the
          // operations independently of other items
          console.time(\`with lfi\`)
          const withLfi = await pipe(
            asConcur([0, 1, 2]),
            mapConcur(mapFn),
            filterConcur(filterFn),
            reduceConcur(toArray()),
          )
          console.timeEnd(\`with lfi\`)

          // Takes 10 seconds! The first item is a bottleneck
          // because \`p-map\` waits for all callbacks
          console.time(\`without lfi\`)
          const withoutLfi = await pFilter(
            await pMap([0, 1, 2], mapFn),
            filterFn,
          )
          console.timeEnd(\`without lfi\`)
        `}</CodeBlock>
      </>
    ),
  },
]

export default Home
