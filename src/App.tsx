import Header from './components/Header'

import AnimatedRoutes from '@/pages/ui/AnimatedRoutes'
import './scss/app.scss'

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<AnimatedRoutes />
			</div>
		</div>
	)
}

export default App
