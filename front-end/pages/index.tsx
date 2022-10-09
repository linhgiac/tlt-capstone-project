import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Home: NextPage = () => {
    const router = useRouter();
    return (
        <div>
            <button
                onClick={() => {
                    router.push({
                        pathname: '/resumes/[id]/edit',
                        query: {
                            id: 1,
                        },
                    });
                }}>
                Goto Edit Page
            </button>
        </div>
    );
};

export default Home;
