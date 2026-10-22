import { Container } from '@/shared/ui/container/Container'
import { Skeleton } from '@/shared/ui/skeleton/Skeleton'
import './questionDetails.css'
import './questionDetailsSkeleton.css'

const Lines = ({ widths, tight = false }: { widths: string[]; tight?: boolean }) => (
    <div className={tight ? 'question-details-skeleton__lines' : 'question-details-skeleton__para'}>
        {widths.map((width, index) => (
            <Skeleton key={index} height={17} width={width} />
        ))}
    </div>
)

export const QuestionDetailsSkeleton = () => {
    return (
        <div className='question-details' role='status' aria-label='Загрузка'>
            <div className='question-details__back-btn question-details-skeleton__back'>
                <Skeleton width={24} height={24} borderRadius={8} />
                <Skeleton width={44} height={14} />
            </div>

            <section className='question-details__inner'>
                <Container className='question-details-header'>
                    <div className='question-details-header__image-container'>
                        <Skeleton width='100%' height='100%' borderRadius={12} />
                    </div>
                    <div className='question-details-header__content-container'>
                        <Skeleton height={29} width='72%' />
                        <Lines tight widths={['100%', '95%', '60%']} />
                    </div>
                </Container>

                <Container className='question-details-navigation'>
                    <Skeleton width={170} height={48} borderRadius={12} />
                    <Skeleton width={170} height={48} borderRadius={12} />
                </Container>

                <Container className='question-details-answer'>
                    <Skeleton height={24} width={132} />
                    <div className='question-details-skeleton__rich'>
                        <Lines widths={['100%', '97%', '54%']} />
                        <Lines widths={['92%', '88%', '80%']} />
                        <Lines widths={['38%']} />
                        <Skeleton height={74} borderRadius={10} />
                    </div>
                </Container>

                <Container className='question-details-answer'>
                    <Skeleton height={24} width={178} />
                    <div className='question-details-skeleton__collapse'>
                        <div className='question-details-skeleton__rich'>
                            <Lines widths={['100%', '96%', '89%']} />
                            <Lines widths={['94%', '71%']} />
                            <Skeleton height={74} borderRadius={10} />
                            <Lines widths={['100%', '85%']} />
                        </div>
                    </div>
                    <Skeleton className='question-details-skeleton__toggle' width={170} height={48} borderRadius={12} />
                </Container>
            </section>

            <Container className='question-details__sidebar question-details-sidebar'>
                <div className='category'>
                    <Skeleton height={17} width={56} />
                    <div className='category__content'>
                        <Skeleton height={29} width={112} borderRadius={8} />
                        <Skeleton height={29} width={126} borderRadius={8} />
                    </div>
                </div>

                <div className='category'>
                    <Skeleton height={17} width={52} />
                    <div className='category__content'>
                        <Skeleton height={42} width={96} borderRadius={12} />
                        <Skeleton height={42} width={128} borderRadius={12} />
                        <Skeleton height={42} width={84} borderRadius={12} />
                    </div>
                </div>

                <div className='category'>
                    <Skeleton height={17} width={100} />
                    <div className='category__content'>
                        <Skeleton height={26} width={90} />
                        <Skeleton height={26} width={110} />
                        <Skeleton height={26} width={70} />
                    </div>
                </div>

                <Skeleton height={17} width={170} />
            </Container>
        </div>
    )
}
