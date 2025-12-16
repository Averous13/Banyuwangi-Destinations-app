import { useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const Gallery1 = () => {
    const [ selectedCategory, setSelectedCategory ] = useState('All');

    const filteredProjects = selectedCategory === 'All'
        ? projects
}

export default Gallery1;