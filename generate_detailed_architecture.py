#!/usr/bin/env python3
"""
Generate comprehensive CQRS architecture with detailed flow diagrams
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Circle, Rectangle
import matplotlib.lines as mlines
import numpy as np
from reportlab.lib.pagesizes import letter, A3
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.graphics.shapes import Drawing, Rect, String, Line, Polygon
from reportlab.graphics import renderPDF
from reportlab.pdfgen import canvas
from reportlab.graphics.charts.lineplots import LinePlot
from reportlab.graphics.widgets.markers import makeMarker
import datetime
import io

def create_system_architecture_diagram():
    """Create complete system architecture diagram"""
    fig, ax = plt.subplots(figsize=(16, 12))
    ax.set_xlim(0, 16)
    ax.set_ylim(0, 12)
    ax.axis('off')
    
    # Title
    ax.text(8, 11.5, 'HYDERABAD INFRA - COMPLETE CQRS ARCHITECTURE', 
            fontsize=20, fontweight='bold', ha='center', color='#2C3E50')
    ax.text(8, 11, 'Event-Driven Microservices with Complete Flow', 
            fontsize=14, ha='center', color='#7F8C8D')
    
    # Frontend Layer
    frontend = FancyBboxPatch((1, 9), 14, 1.5, 
                              boxstyle="round,pad=0.1", 
                              facecolor='#3498DB', edgecolor='#2980B9', linewidth=2)
    ax.add_patch(frontend)
    ax.text(8, 9.75, 'FRONTEND (React/JavaScript)', 
            fontsize=12, fontweight='bold', ha='center', color='white')
    ax.text(8, 9.25, 'cqrs-integration.js | Auto User History on Login | Real-time Updates', 
            fontsize=9, ha='center', color='white')
    
    # API Gateway
    gateway = FancyBboxPatch((6, 7.5), 4, 1, 
                             boxstyle="round,pad=0.05", 
                             facecolor='#9B59B6', edgecolor='#8E44AD', linewidth=2)
    ax.add_patch(gateway)
    ax.text(8, 8, 'API GATEWAY :8080', 
            fontsize=11, fontweight='bold', ha='center', color='white')
    
    # Microservices Layer
    services = [
        {'name': 'User Service\n:8081', 'x': 1, 'y': 5.5, 'color': '#E74C3C', 'type': 'CMD+QRY'},
        {'name': 'Property Service\n:8082', 'x': 4, 'y': 5.5, 'color': '#E67E22', 'type': 'COMMAND'},
        {'name': 'Search Service\n:8083', 'x': 7, 'y': 5.5, 'color': '#F39C12', 'type': 'QUERY'},
        {'name': 'User History\n:8084', 'x': 10, 'y': 5.5, 'color': '#27AE60', 'type': 'QUERY'},
        {'name': 'Notification\n:8085', 'x': 13, 'y': 5.5, 'color': '#16A085', 'type': 'CONSUMER'},
    ]
    
    for service in services:
        box = FancyBboxPatch((service['x'], service['y']), 2, 1.2, 
                             boxstyle="round,pad=0.05", 
                             facecolor=service['color'], edgecolor='darkgray', linewidth=1.5)
        ax.add_patch(box)
        ax.text(service['x'] + 1, service['y'] + 0.8, service['name'], 
                fontsize=9, fontweight='bold', ha='center', color='white')
        ax.text(service['x'] + 1, service['y'] + 0.3, service['type'], 
                fontsize=7, ha='center', color='white', style='italic')
    
    # Kafka Event Bus
    kafka = FancyBboxPatch((1, 3.5), 14, 1, 
                           boxstyle="round,pad=0.05", 
                           facecolor='#34495E', edgecolor='#2C3E50', linewidth=2)
    ax.add_patch(kafka)
    ax.text(8, 4, 'APACHE KAFKA EVENT BUS :9092', 
            fontsize=11, fontweight='bold', ha='center', color='white')
    ax.text(3, 3.7, 'property-events', fontsize=8, ha='center', color='#F39C12')
    ax.text(8, 3.7, 'user-activity', fontsize=8, ha='center', color='#3498DB')
    ax.text(13, 3.7, 'notification-events', fontsize=8, ha='center', color='#E74C3C')
    
    # Data Layer
    databases = [
        {'name': 'PostgreSQL\nuser_db', 'x': 1.5, 'y': 1.5, 'color': '#336699'},
        {'name': 'PostgreSQL\nproperty_db', 'x': 4.5, 'y': 1.5, 'color': '#336699'},
        {'name': 'PostgreSQL\nsearch_db', 'x': 7.5, 'y': 1.5, 'color': '#336699'},
        {'name': 'PostgreSQL\nhistory_db', 'x': 10.5, 'y': 1.5, 'color': '#336699'},
        {'name': 'Redis\nCache', 'x': 13.5, 'y': 1.5, 'color': '#DC382D'},
    ]
    
    for db in databases:
        box = FancyBboxPatch((db['x']-0.5, db['y']), 1.5, 0.8, 
                             boxstyle="round,pad=0.02", 
                             facecolor=db['color'], edgecolor='darkgray', linewidth=1)
        ax.add_patch(box)
        ax.text(db['x'] + 0.25, db['y'] + 0.4, db['name'], 
                fontsize=8, ha='center', color='white')
    
    # Event Store Special
    event_store = FancyBboxPatch((10, 0.3), 2.5, 0.8, 
                                boxstyle="round,pad=0.02", 
                                facecolor='#8E44AD', edgecolor='#6C3483', linewidth=2)
    ax.add_patch(event_store)
    ax.text(11.25, 0.7, 'EVENT STORE', fontsize=9, fontweight='bold', ha='center', color='white')
    ax.text(11.25, 0.4, 'Complete Audit Trail', fontsize=7, ha='center', color='white')
    
    # Draw connections with labels
    # Frontend to Gateway
    ax.arrow(8, 9, 0, -0.4, head_width=0.1, head_length=0.05, fc='blue', ec='blue')
    ax.text(8.2, 8.7, 'HTTP/REST', fontsize=7, color='blue')
    
    # Gateway to Services
    for i, x in enumerate([2, 5, 8, 11, 14]):
        ax.arrow(8, 7.5, x-8, -0.8, head_width=0.08, head_length=0.05, 
                fc='purple', ec='purple', alpha=0.6, linestyle='--')
    
    # Services to Kafka
    for service in services:
        if service['type'] in ['COMMAND', 'CMD+QRY']:
            ax.arrow(service['x'] + 1, service['y'], 0, -1, 
                    head_width=0.08, head_length=0.05, fc='orange', ec='orange')
            ax.text(service['x'] + 1.2, service['y'] - 0.5, 'Publish', 
                   fontsize=6, color='orange')
    
    # Kafka to Consumers
    for service in services:
        if service['type'] in ['QUERY', 'CONSUMER']:
            ax.arrow(service['x'] + 1, 4.5, 0, 0.5, 
                    head_width=0.08, head_length=0.05, fc='green', ec='green')
            ax.text(service['x'] + 0.5, 4.8, 'Consume', 
                   fontsize=6, color='green')
    
    # Services to Databases
    for i, service in enumerate(services[:4]):
        ax.arrow(service['x'] + 1, service['y'], 0, -3, 
                head_width=0.08, head_length=0.05, fc='gray', ec='gray', alpha=0.5)
    
    # RestTemplate connection
    ax.annotate('', xy=(5, 6), xytext=(2, 6),
                arrowprops=dict(arrowstyle='<->', color='red', lw=2))
    ax.text(3.5, 6.2, 'RestTemplate', fontsize=7, color='red', ha='center')
    
    # Add legend
    legend_elements = [
        mlines.Line2D([], [], color='blue', marker='>', markersize=8, label='Frontend Request'),
        mlines.Line2D([], [], color='purple', marker='>', markersize=8, label='Gateway Routing'),
        mlines.Line2D([], [], color='orange', marker='>', markersize=8, label='Event Publishing'),
        mlines.Line2D([], [], color='green', marker='>', markersize=8, label='Event Consumption'),
        mlines.Line2D([], [], color='red', marker='s', markersize=8, label='Sync Communication'),
    ]
    ax.legend(handles=legend_elements, loc='lower left', fontsize=8)
    
    plt.tight_layout()
    
    # Save to bytes
    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format='png', dpi=150, bbox_inches='tight')
    img_buffer.seek(0)
    plt.close()
    
    return img_buffer

def create_event_flow_diagram():
    """Create detailed event flow diagram"""
    fig, ax = plt.subplots(figsize=(14, 10))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 10)
    ax.axis('off')
    
    # Title
    ax.text(7, 9.5, 'COMPLETE EVENT FLOW - PROPERTY CREATION', 
            fontsize=18, fontweight='bold', ha='center', color='#2C3E50')
    
    # Step boxes with detailed flow
    steps = [
        {'step': '1', 'title': 'User Action', 'desc': 'User clicks\n"Create Property"', 
         'x': 1, 'y': 8, 'color': '#3498DB'},
        {'step': '2', 'title': 'Frontend', 'desc': 'cqrsAPI.createProperty()\nwith session tracking', 
         'x': 4, 'y': 8, 'color': '#3498DB'},
        {'step': '3', 'title': 'API Gateway', 'desc': 'JWT validation\nRoute to Property Service', 
         'x': 7, 'y': 8, 'color': '#9B59B6'},
        {'step': '4', 'title': 'Property Service', 'desc': 'PropertyCommandHandler\n.handleCreateProperty()', 
         'x': 10, 'y': 8, 'color': '#E67E22'},
        {'step': '5', 'title': 'Database', 'desc': 'Save property\nto PostgreSQL', 
         'x': 13, 'y': 8, 'color': '#336699'},
        
        {'step': '6', 'title': 'Event Creation', 'desc': 'PropertyCreatedEvent\nUserActivityEvent', 
         'x': 10, 'y': 5.5, 'color': '#E74C3C'},
        {'step': '7', 'title': 'Kafka Publish', 'desc': 'property-events topic\nuser-activity topic', 
         'x': 7, 'y': 5.5, 'color': '#34495E'},
        {'step': '8', 'title': 'Event Consumers', 'desc': 'UserHistoryService\nNotificationService', 
         'x': 4, 'y': 5.5, 'color': '#27AE60'},
        {'step': '9', 'title': 'Event Store', 'desc': 'Store in event_store\nUpdate user_activity', 
         'x': 1, 'y': 5.5, 'color': '#8E44AD'},
        
        {'step': '10', 'title': 'Redis Cache', 'desc': 'Update cached\nuser history', 
         'x': 1, 'y': 3, 'color': '#DC382D'},
        {'step': '11', 'title': 'RestTemplate', 'desc': 'Update user\nproperty count', 
         'x': 4, 'y': 3, 'color': '#E74C3C'},
        {'step': '12', 'title': 'Response', 'desc': 'Success response\nto frontend', 
         'x': 7, 'y': 3, 'color': '#3498DB'},
        {'step': '13', 'title': 'UI Update', 'desc': 'Show notification\nAuto-fetch history', 
         'x': 10, 'y': 3, 'color': '#3498DB'},
        {'step': '14', 'title': 'History Display', 'desc': 'Show activity\ntimeline popup', 
         'x': 13, 'y': 3, 'color': '#27AE60'},
    ]
    
    for step in steps:
        # Draw box
        box = FancyBboxPatch((step['x']-0.8, step['y']-0.4), 1.6, 0.8, 
                             boxstyle="round,pad=0.02", 
                             facecolor=step['color'], edgecolor='darkgray', 
                             linewidth=1, alpha=0.9)
        ax.add_patch(box)
        
        # Step number
        circle = Circle((step['x']-0.6, step['y']+0.2), 0.15, 
                       facecolor='white', edgecolor='black', linewidth=1)
        ax.add_patch(circle)
        ax.text(step['x']-0.6, step['y']+0.2, step['step'], 
                fontsize=10, fontweight='bold', ha='center', va='center')
        
        # Text
        ax.text(step['x'], step['y']+0.15, step['title'], 
                fontsize=9, fontweight='bold', ha='center', color='white')
        ax.text(step['x'], step['y']-0.15, step['desc'], 
                fontsize=7, ha='center', color='white')
    
    # Draw flow arrows
    arrows = [
        (1, 8, 4, 8), (4, 8, 7, 8), (7, 8, 10, 8), (10, 8, 13, 8),
        (13, 7.6, 10, 6), (10, 5.5, 7, 5.5), (7, 5.5, 4, 5.5), (4, 5.5, 1, 5.5),
        (1, 5.1, 1, 3.4), (1, 3, 4, 3), (4, 3, 7, 3), (7, 3, 10, 3), (10, 3, 13, 3)
    ]
    
    for x1, y1, x2, y2 in arrows:
        ax.annotate('', xy=(x2-0.9, y2), xytext=(x1+0.9, y1),
                   arrowprops=dict(arrowstyle='->', color='#2C3E50', lw=2))
    
    # Add timing annotations
    timings = [
        ('< 100ms', 2.5, 8.3),
        ('< 50ms', 5.5, 8.3),
        ('< 200ms', 11.5, 8.3),
        ('Async', 8.5, 5.8),
        ('< 10ms', 2.5, 3.3),
        ('< 500ms total', 7, 2.3)
    ]
    
    for text, x, y in timings:
        ax.text(x, y, text, fontsize=7, color='#7F8C8D', style='italic')
    
    # Event structure example
    ax.text(7, 1.5, 'Event Structure Example:', fontsize=10, fontweight='bold', ha='center')
    event_json = """
{
  "eventId": "uuid-123",
  "aggregateId": "prop-456",
  "userId": "user-789",
  "eventType": "PROPERTY_CREATED",
  "timestamp": "2024-01-15T10:30:00Z",
  "eventData": {...}
}"""
    ax.text(7, 0.8, event_json, fontsize=7, ha='center', 
           family='monospace', bbox=dict(boxstyle="round", facecolor='#ECF0F1'))
    
    plt.tight_layout()
    
    # Save to bytes
    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format='png', dpi=150, bbox_inches='tight')
    img_buffer.seek(0)
    plt.close()
    
    return img_buffer

def create_api_endpoints_flow():
    """Create API endpoints flow diagram"""
    fig, ax = plt.subplots(figsize=(14, 10))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 10)
    ax.axis('off')
    
    # Title
    ax.text(7, 9.5, 'COMPLETE API ENDPOINTS & DATA FLOW', 
            fontsize=18, fontweight='bold', ha='center', color='#2C3E50')
    
    # API Endpoints by service
    endpoints = {
        'User Service :8081': {
            'endpoints': [
                ('POST', '/api/auth/register', 'User Registration'),
                ('POST', '/api/auth/login', 'User Login + History Fetch'),
                ('GET', '/api/users/{id}', 'Get User Profile'),
                ('PUT', '/api/users/{id}', 'Update User'),
                ('POST', '/api/users/{id}/property-count', 'Update Property Count')
            ],
            'x': 1, 'y': 7.5, 'color': '#E74C3C'
        },
        'Property Service :8082': {
            'endpoints': [
                ('POST', '/api/properties', 'Create Property (CQRS Command)'),
                ('GET', '/api/properties/{id}', 'View Property (Tracked)'),
                ('PUT', '/api/properties/{id}', 'Update Property'),
                ('DELETE', '/api/properties/{id}', 'Delete Property'),
                ('GET', '/api/properties/user/{userId}', 'User Properties')
            ],
            'x': 5, 'y': 7.5, 'color': '#E67E22'
        },
        'Search Service :8083': {
            'endpoints': [
                ('GET', '/api/search/properties', 'Search Properties'),
                ('POST', '/api/search/advanced', 'Advanced Search'),
                ('GET', '/api/search/filters', 'Get Search Filters'),
                ('GET', '/api/search/suggestions', 'Auto-suggestions'),
                ('GET', '/api/search/history/{userId}', 'Search History')
            ],
            'x': 9, 'y': 7.5, 'color': '#F39C12'
        },
        'User History :8084': {
            'endpoints': [
                ('GET', '/api/user-history/{userId}', 'Complete History'),
                ('GET', '/api/user-history/{userId}/recent', 'Recent Activities'),
                ('GET', '/api/user-history/{userId}/properties', 'Property Activities'),
                ('GET', '/api/user-history/{userId}/searches', 'Search History'),
                ('GET', '/api/user-history/{userId}/events', 'Raw Events')
            ],
            'x': 1, 'y': 3.5, 'color': '#27AE60'
        },
        'Notification :8085': {
            'endpoints': [
                ('POST', '/api/notifications/email', 'Send Email'),
                ('POST', '/api/notifications/sms', 'Send SMS'),
                ('GET', '/api/notifications/{userId}', 'User Notifications'),
                ('PUT', '/api/notifications/{id}/read', 'Mark as Read'),
                ('GET', '/api/notifications/preferences', 'Get Preferences')
            ],
            'x': 5, 'y': 3.5, 'color': '#16A085'
        },
        'File Upload :8086': {
            'endpoints': [
                ('POST', '/api/files/upload', 'Upload File'),
                ('GET', '/api/files/{id}', 'Download File'),
                ('DELETE', '/api/files/{id}', 'Delete File'),
                ('POST', '/api/files/bulk', 'Bulk Upload'),
                ('GET', '/api/files/property/{id}', 'Property Files')
            ],
            'x': 9, 'y': 3.5, 'color': '#8E44AD'
        }
    }
    
    for service, data in endpoints.items():
        # Service box
        box = FancyBboxPatch((data['x']-0.5, data['y']-1.5), 3.5, 2.5, 
                             boxstyle="round,pad=0.05", 
                             facecolor=data['color'], edgecolor='darkgray', 
                             linewidth=2, alpha=0.9)
        ax.add_patch(box)
        
        # Service name
        ax.text(data['x']+1.25, data['y']+0.8, service, 
                fontsize=10, fontweight='bold', ha='center', color='white')
        
        # Endpoints
        for i, (method, endpoint, desc) in enumerate(data['endpoints']):
            y_pos = data['y'] + 0.4 - (i * 0.3)
            
            # Method badge
            method_colors = {
                'GET': '#27AE60',
                'POST': '#3498DB', 
                'PUT': '#F39C12',
                'DELETE': '#E74C3C'
            }
            method_box = FancyBboxPatch((data['x']-0.3, y_pos-0.1), 0.5, 0.2,
                                       boxstyle="round,pad=0.01",
                                       facecolor=method_colors.get(method, '#95A5A6'),
                                       edgecolor='none')
            ax.add_patch(method_box)
            ax.text(data['x']-0.05, y_pos, method, 
                   fontsize=6, fontweight='bold', ha='center', color='white')
            
            # Endpoint
            ax.text(data['x']+0.3, y_pos, endpoint, 
                   fontsize=7, ha='left', color='white', family='monospace')
            
            # Description
            ax.text(data['x']+2.8, y_pos, f'({desc})', 
                   fontsize=6, ha='right', color='#ECF0F1', style='italic')
    
    # Data flow indicators
    ax.text(7, 1.8, 'Data Flow Patterns:', fontsize=12, fontweight='bold', ha='center')
    
    patterns = [
        ('Command Flow:', 'Frontend → Gateway → Service → Database → Event → Kafka', '#3498DB'),
        ('Query Flow:', 'Frontend → Gateway → Service → Cache/Database → Response', '#27AE60'),
        ('Event Flow:', 'Service → Kafka → Consumers → Event Store → Read Models', '#E74C3C'),
        ('Sync Flow:', 'Service → RestTemplate → Target Service → Response', '#F39C12')
    ]
    
    for i, (label, flow, color) in enumerate(patterns):
        y_pos = 1.3 - (i * 0.3)
        ax.text(3, y_pos, label, fontsize=8, fontweight='bold', color=color)
        ax.text(4.5, y_pos, flow, fontsize=7, color='#2C3E50')
    
    plt.tight_layout()
    
    # Save to bytes
    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format='png', dpi=150, bbox_inches='tight')
    img_buffer.seek(0)
    plt.close()
    
    return img_buffer

def create_cqrs_pattern_diagram():
    """Create CQRS pattern visualization"""
    fig, ax = plt.subplots(figsize=(14, 10))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 10)
    ax.axis('off')
    
    # Title
    ax.text(7, 9.5, 'CQRS PATTERN IMPLEMENTATION', 
            fontsize=18, fontweight='bold', ha='center', color='#2C3E50')
    
    # Command Side
    command_box = FancyBboxPatch((0.5, 5), 5.5, 3.5, 
                                 boxstyle="round,pad=0.1", 
                                 facecolor='#E8F6F3', edgecolor='#27AE60', linewidth=2)
    ax.add_patch(command_box)
    ax.text(3.25, 8.2, 'COMMAND SIDE (Write Model)', 
            fontsize=12, fontweight='bold', ha='center', color='#27AE60')
    
    # Command components
    components = [
        {'name': 'PropertyCommandHandler', 'x': 3.25, 'y': 7.5},
        {'name': 'CreatePropertyCommand', 'x': 1.5, 'y': 6.8},
        {'name': 'UpdatePropertyCommand', 'x': 3.25, 'y': 6.8},
        {'name': 'DeletePropertyCommand', 'x': 5, 'y': 6.8},
        {'name': 'Property Domain Model', 'x': 3.25, 'y': 6.1},
        {'name': 'Property Repository', 'x': 3.25, 'y': 5.4},
    ]
    
    for comp in components:
        box = FancyBboxPatch((comp['x']-0.8, comp['y']-0.15), 1.6, 0.3,
                             boxstyle="round,pad=0.02",
                             facecolor='white', edgecolor='#27AE60')
        ax.add_patch(box)
        ax.text(comp['x'], comp['y'], comp['name'], 
               fontsize=8, ha='center', va='center')
    
    # Query Side
    query_box = FancyBboxPatch((8, 5), 5.5, 3.5, 
                               boxstyle="round,pad=0.1", 
                               facecolor='#EBF5FB', edgecolor='#3498DB', linewidth=2)
    ax.add_patch(query_box)
    ax.text(10.75, 8.2, 'QUERY SIDE (Read Model)', 
            fontsize=12, fontweight='bold', ha='center', color='#3498DB')
    
    # Query components
    query_components = [
        {'name': 'UserHistoryQueryHandler', 'x': 10.75, 'y': 7.5},
        {'name': 'GetUserHistoryQuery', 'x': 9, 'y': 6.8},
        {'name': 'GetRecentActivitiesQuery', 'x': 10.75, 'y': 6.8},
        {'name': 'GetPropertyActivitiesQuery', 'x': 12.5, 'y': 6.8},
        {'name': 'UserActivity Read Model', 'x': 10.75, 'y': 6.1},
        {'name': 'Redis Cache Layer', 'x': 10.75, 'y': 5.4},
    ]
    
    for comp in query_components:
        box = FancyBboxPatch((comp['x']-0.9, comp['y']-0.15), 1.8, 0.3,
                             boxstyle="round,pad=0.02",
                             facecolor='white', edgecolor='#3498DB')
        ax.add_patch(box)
        ax.text(comp['x'], comp['y'], comp['name'], 
               fontsize=8, ha='center', va='center')
    
    # Event Store in the middle
    event_store = FancyBboxPatch((5.5, 3.5), 3, 1, 
                                 boxstyle="round,pad=0.05", 
                                 facecolor='#8E44AD', edgecolor='#6C3483', linewidth=2)
    ax.add_patch(event_store)
    ax.text(7, 4, 'EVENT STORE', 
            fontsize=11, fontweight='bold', ha='center', color='white')
    ax.text(7, 3.7, 'Complete Event Sourcing', 
            fontsize=8, ha='center', color='white')
    
    # Kafka
    kafka = FancyBboxPatch((5.5, 2), 3, 0.8, 
                          boxstyle="round,pad=0.05", 
                          facecolor='#34495E', edgecolor='#2C3E50', linewidth=2)
    ax.add_patch(kafka)
    ax.text(7, 2.4, 'KAFKA EVENT BUS', 
            fontsize=10, fontweight='bold', ha='center', color='white')
    
    # Flow arrows
    # Commands to Event Store
    ax.arrow(3.25, 5.2, 2, -0.5, head_width=0.1, head_length=0.05, 
            fc='#27AE60', ec='#27AE60')
    ax.text(4, 4.5, 'Publish Events', fontsize=7, color='#27AE60')
    
    # Event Store to Queries
    ax.arrow(8.5, 4, 2, 1, head_width=0.1, head_length=0.05, 
            fc='#3498DB', ec='#3498DB')
    ax.text(9.5, 4.5, 'Read Events', fontsize=7, color='#3498DB')
    
    # Kafka connections
    ax.arrow(7, 3.5, 0, -0.6, head_width=0.1, head_length=0.05, 
            fc='#8E44AD', ec='#8E44AD')
    ax.arrow(7, 2.8, 0, 0.6, head_width=0.1, head_length=0.05, 
            fc='#8E44AD', ec='#8E44AD')
    
    # Benefits boxes
    benefits = [
        {'title': 'Command Benefits', 'items': [
            '• Optimized for writes',
            '• Business logic focused',
            '• Strong consistency',
            '• Domain-driven design'
        ], 'x': 2, 'y': 1, 'color': '#27AE60'},
        {'title': 'Query Benefits', 'items': [
            '• Optimized for reads',
            '• Denormalized data',
            '• Fast response times',
            '• Cached results'
        ], 'x': 7, 'y': 1, 'color': '#3498DB'},
        {'title': 'Event Sourcing Benefits', 'items': [
            '• Complete audit trail',
            '• Event replay capability',
            '• Time travel debugging',
            '• Analytics ready'
        ], 'x': 12, 'y': 1, 'color': '#8E44AD'}
    ]
    
    for benefit in benefits:
        box = FancyBboxPatch((benefit['x']-1.3, benefit['y']-0.6), 2.6, 1.2,
                             boxstyle="round,pad=0.02",
                             facecolor='white', edgecolor=benefit['color'], linewidth=1)
        ax.add_patch(box)
        ax.text(benefit['x'], benefit['y']+0.4, benefit['title'], 
               fontsize=8, fontweight='bold', ha='center', color=benefit['color'])
        
        for i, item in enumerate(benefit['items']):
            ax.text(benefit['x'], benefit['y']+0.1-(i*0.15), item, 
                   fontsize=6, ha='center', color='#2C3E50')
    
    plt.tight_layout()
    
    # Save to bytes
    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format='png', dpi=150, bbox_inches='tight')
    img_buffer.seek(0)
    plt.close()
    
    return img_buffer

def create_user_journey_flow():
    """Create complete user journey flow"""
    fig, ax = plt.subplots(figsize=(14, 10))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 10)
    ax.axis('off')
    
    # Title
    ax.text(7, 9.5, 'USER JOURNEY - LOGIN TO HISTORY DISPLAY', 
            fontsize=18, fontweight='bold', ha='center', color='#2C3E50')
    ax.text(7, 9, 'Complete flow showing how users get their history on login', 
            fontsize=10, ha='center', color='#7F8C8D')
    
    # Journey steps
    journey = [
        {'step': '1', 'action': 'User Opens Website', 'system': 'Load index.html\nInitialize cqrs-integration.js',
         'x': 1, 'y': 7.5, 'color': '#3498DB'},
        {'step': '2', 'action': 'User Clicks Login', 'system': 'Show login form\nPrepare auth request',
         'x': 3.5, 'y': 7.5, 'color': '#3498DB'},
        {'step': '3', 'action': 'Enter Credentials', 'system': 'Validate input\nPrepare POST request',
         'x': 6, 'y': 7.5, 'color': '#3498DB'},
        {'step': '4', 'action': 'Submit Login', 'system': 'POST /api/auth/login\nto User Service',
         'x': 8.5, 'y': 7.5, 'color': '#E74C3C'},
        {'step': '5', 'action': 'Authentication', 'system': 'Verify credentials\nGenerate JWT token',
         'x': 11, 'y': 7.5, 'color': '#E74C3C'},
        {'step': '6', 'action': 'Login Success', 'system': 'Return user data\n+ JWT token',
         'x': 13, 'y': 7.5, 'color': '#27AE60'},
        
        {'step': '7', 'action': 'Initialize Session', 'system': 'cqrsAPI.initializeUserSession(userId)\nStore JWT',
         'x': 11, 'y': 5, 'color': '#3498DB'},
        {'step': '8', 'action': 'Auto-Fetch History', 'system': 'cqrsAPI.fetchUserHistory()\nGET /api/user-history/{userId}',
         'x': 8.5, 'y': 5, 'color': '#F39C12'},
        {'step': '9', 'action': 'Query Handler', 'system': 'UserHistoryQueryHandler\nCheck Redis cache',
         'x': 6, 'y': 5, 'color': '#27AE60'},
        {'step': '10', 'action': 'Fetch from DB', 'system': 'Query user_activity table\nQuery event_store',
         'x': 3.5, 'y': 5, 'color': '#336699'},
        {'step': '11', 'action': 'Build Response', 'system': 'Aggregate activities\nCalculate summary',
         'x': 1, 'y': 5, 'color': '#27AE60'},
        
        {'step': '12', 'action': 'Cache Update', 'system': 'Store in Redis\nSet TTL',
         'x': 1, 'y': 2.5, 'color': '#DC382D'},
        {'step': '13', 'action': 'Return History', 'system': 'JSON response\nwith activities',
         'x': 3.5, 'y': 2.5, 'color': '#3498DB'},
        {'step': '14', 'action': 'Display History', 'system': 'displayUserHistory()\nCreate popup',
         'x': 6, 'y': 2.5, 'color': '#3498DB'},
        {'step': '15', 'action': 'Show Timeline', 'system': 'Activity timeline\n30s auto-hide',
         'x': 8.5, 'y': 2.5, 'color': '#27AE60'},
        {'step': '16', 'action': 'Track Activity', 'system': 'Log USER_LOGIN event\nPublish to Kafka',
         'x': 11, 'y': 2.5, 'color': '#E74C3C'},
        {'step': '17', 'action': 'Ready State', 'system': 'User sees dashboard\n+ activity history',
         'x': 13, 'y': 2.5, 'color': '#27AE60'}
    ]
    
    for j in journey:
        # Draw box
        box = FancyBboxPatch((j['x']-0.6, j['y']-0.4), 1.2, 0.8, 
                             boxstyle="round,pad=0.02", 
                             facecolor=j['color'], edgecolor='darkgray', 
                             linewidth=1, alpha=0.9)
        ax.add_patch(box)
        
        # Step number
        circle = Circle((j['x']-0.4, j['y']+0.25), 0.12, 
                       facecolor='white', edgecolor='black', linewidth=1)
        ax.add_patch(circle)
        ax.text(j['x']-0.4, j['y']+0.25, j['step'], 
                fontsize=8, fontweight='bold', ha='center', va='center')
        
        # Text
        ax.text(j['x'], j['y']+0.1, j['action'], 
                fontsize=7, fontweight='bold', ha='center', color='white')
        ax.text(j['x'], j['y']-0.15, j['system'], 
                fontsize=6, ha='center', color='white')
    
    # Draw flow lines
    # Top row
    for i in range(5):
        ax.arrow(1.7 + i*2.5, 7.5, 1.5, 0, head_width=0.08, head_length=0.05, 
                fc='gray', ec='gray', alpha=0.5)
    
    # Down arrow
    ax.arrow(13, 7.1, 0, -1.5, head_width=0.1, head_length=0.05, 
            fc='green', ec='green')
    
    # Middle row (right to left)
    for i in range(4):
        ax.arrow(10.8 - i*2.5, 5, -1.5, 0, head_width=0.08, head_length=0.05, 
                fc='gray', ec='gray', alpha=0.5)
    
    # Down arrow
    ax.arrow(1, 4.6, 0, -1.5, head_width=0.1, head_length=0.05, 
            fc='green', ec='green')
    
    # Bottom row
    for i in range(5):
        ax.arrow(1.7 + i*2.5, 2.5, 1.5, 0, head_width=0.08, head_length=0.05, 
                fc='gray', ec='gray', alpha=0.5)
    
    # Key timings
    ax.text(7, 1.5, 'Total Time: < 2 seconds from login to history display', 
           fontsize=10, fontweight='bold', ha='center', color='#E74C3C')
    
    # Legend
    ax.text(7, 0.8, 'Key Components Involved:', fontsize=9, fontweight='bold', ha='center')
    components_text = 'Frontend (cqrs-integration.js) → API Gateway → User Service → User History Service → Redis/PostgreSQL → Event Store'
    ax.text(7, 0.4, components_text, fontsize=7, ha='center', color='#2C3E50')
    
    plt.tight_layout()
    
    # Save to bytes
    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format='png', dpi=150, bbox_inches='tight')
    img_buffer.seek(0)
    plt.close()
    
    return img_buffer

def create_detailed_architecture_pdf():
    """Generate comprehensive PDF with all diagrams"""
    
    # Create PDF with larger page size for better diagrams
    doc = SimpleDocTemplate(
        "CQRS_Complete_Architecture_Detailed.pdf",
        pagesize=A3,
        rightMargin=30,
        leftMargin=30,
        topMargin=30,
        bottomMargin=30
    )
    
    # Define styles
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Title'],
        fontSize=28,
        textColor=colors.HexColor('#2E86C1'),
        spaceAfter=20,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading1'],
        fontSize=20,
        textColor=colors.HexColor('#E74C3C'),
        spaceBefore=20,
        spaceAfter=15,
        fontName='Helvetica-Bold'
    )
    
    # Content list
    content = []
    
    # Title Page
    content.append(Paragraph("🏗️ HYDERABAD INFRA", title_style))
    content.append(Paragraph("Complete CQRS Architecture with Detailed Flow Diagrams", heading_style))
    content.append(Spacer(1, 30))
    
    # Generate and add diagrams
    print("Generating system architecture diagram...")
    system_diagram = create_system_architecture_diagram()
    img1 = Image(system_diagram, width=10*inch, height=7.5*inch)
    content.append(Paragraph("1. Complete System Architecture", heading_style))
    content.append(img1)
    content.append(PageBreak())
    
    print("Generating event flow diagram...")
    event_diagram = create_event_flow_diagram()
    img2 = Image(event_diagram, width=10*inch, height=7*inch)
    content.append(Paragraph("2. Complete Event Flow - Property Creation", heading_style))
    content.append(img2)
    content.append(PageBreak())
    
    print("Generating API endpoints flow...")
    api_diagram = create_api_endpoints_flow()
    img3 = Image(api_diagram, width=10*inch, height=7*inch)
    content.append(Paragraph("3. API Endpoints & Data Flow", heading_style))
    content.append(img3)
    content.append(PageBreak())
    
    print("Generating CQRS pattern diagram...")
    cqrs_diagram = create_cqrs_pattern_diagram()
    img4 = Image(cqrs_diagram, width=10*inch, height=7*inch)
    content.append(Paragraph("4. CQRS Pattern Implementation", heading_style))
    content.append(img4)
    content.append(PageBreak())
    
    print("Generating user journey flow...")
    journey_diagram = create_user_journey_flow()
    img5 = Image(journey_diagram, width=10*inch, height=7*inch)
    content.append(Paragraph("5. User Journey - Login to History Display", heading_style))
    content.append(img5)
    
    # Build PDF
    doc.build(content)
    print("✅ Detailed PDF generated successfully: CQRS_Complete_Architecture_Detailed.pdf")

if __name__ == "__main__":
    # Install required packages if needed
    import subprocess
    import sys
    
    try:
        import matplotlib
        import reportlab
    except ImportError:
        print("Installing required packages...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "matplotlib", "reportlab"])
    
    create_detailed_architecture_pdf()