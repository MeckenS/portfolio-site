import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Securing',
    Svg: require('@site/static/img/026-cloud-secure.svg').default,
    description: (
      <>
        Investigate vendor specific and open-source tools to help mitigate Threats, Risks and Vulnerabilities.
      </>
    ),
  },
  {
    title: 'Scaling',
    Svg: require('@site/static/img/033-cloud computing-failover.svg').default,
    description: (
      <>
        Explore techniques for scaling infrastructure and applications to meet growing demands and optimize performance.
      </>
    ),
  },
  {
    title: 'Monitoring',
    Svg: require('@site/static/img/014-search.svg').default,
    description: (
      <>
        Utilize monitoring solutions to gather logging data and track resource utilization. Make the tansition from being reactive to proactive.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
